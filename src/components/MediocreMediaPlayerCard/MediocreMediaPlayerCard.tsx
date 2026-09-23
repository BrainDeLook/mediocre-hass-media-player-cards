import {
  CardContext,
  CardContextProvider,
  CardContextType,
} from "@components/CardContext";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
import type { MediocreMediaPlayerCardConfig } from "@types";
import {
  getMediocreLegacyConfigToMediocreMultiConfig,
  getVirtualMediaPlayerCards,
} from "@utils";
import { MediocreCompactMultiMediaPlayerCard } from "@components/MediocreCompactMultiMediaPlayerCard";
import { SelectedPlayerProvider } from "@components/SelectedPlayerContext";
import { useHass } from "@components/HassContext";
import { preloadArtworkPalette } from "@hooks/useArtworkColors";

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
  const hass = useHass();

  const virtualCards = useMemo(
    () => getVirtualMediaPlayerCards(config),
    [config]
  );
  useEffect(() => {
    for (const card of virtualCards) {
      const attributes = hass.states[card.entity_id]?.attributes;
      const albumArt =
        attributes?.entity_picture_local || attributes?.entity_picture;
      if (typeof albumArt === "string") void preloadArtworkPalette(albumArt);
    }
  }, [hass, virtualCards]);
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
