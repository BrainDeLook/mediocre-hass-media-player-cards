import {
  CardContext,
  CardContextProvider,
  CardContextType,
} from "@components/CardContext";
import { useContext, useMemo, useState } from "preact/hooks";
import type { MediocreMediaPlayerCardConfig } from "@types";
import {
  getMediocreLegacyConfigToMediocreMultiConfig,
  getVirtualMediaPlayerCards,
} from "@utils";
import { MediocreCompactMultiMediaPlayerCard } from "@components/MediocreCompactMultiMediaPlayerCard";
import { SelectedPlayerProvider } from "@components/SelectedPlayerContext";

export type MediocreMediaPlayerCardProps = {
  isEmbeddedInMultiCard?: boolean;
  onClick?: () => void;
};

export const MediocreMediaPlayerCard = ({
  isEmbeddedInMultiCard,
  onClick,
}: MediocreMediaPlayerCardProps) => {
  const { rootElement, config } =
    useContext<CardContextType<MediocreMediaPlayerCardConfig>>(CardContext);

  const virtualCards = useMemo(
    () => getVirtualMediaPlayerCards(config),
    [config]
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const selectedIndex = Math.min(selectedCardIndex, virtualCards.length - 1);
  const selectedCard = virtualCards[selectedIndex];
  const multiConfig = useMemo(
    () => getMediocreLegacyConfigToMediocreMultiConfig(selectedCard),
    [selectedCard]
  );
  const switchCard = () => {
    setSelectedCardIndex((selectedIndex + 1) % virtualCards.length);
  };

  return (
    <CardContextProvider rootElement={rootElement} config={multiConfig}>
      <SelectedPlayerProvider
        key={`${selectedIndex}-${selectedCard.entity_id}`}
        lockToDefaultPlayer
      >
        <MediocreCompactMultiMediaPlayerCard
          isEmbeddedInMultiCard={isEmbeddedInMultiCard}
          onClick={onClick}
          onSwitchPlayer={virtualCards.length > 1 ? switchCard : undefined}
          hideInternalPlayerSwitch
        />
      </SelectedPlayerProvider>
    </CardContextProvider>
  );
};
