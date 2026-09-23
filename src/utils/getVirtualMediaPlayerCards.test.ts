import { getVirtualMediaPlayerCards } from "./getVirtualMediaPlayerCards";
import { getMediocreLegacyConfigToMediocreMultiConfig } from "./getMediocreLegacyConfigToMultiConfig";
import { MediocreMediaPlayerCardConfig } from "@types";

it("creates independent compact cards with their own display and player settings", () => {
  const config: MediocreMediaPlayerCardConfig = {
    type: "custom:mediocre-media-player-card",
    entity_id: "media_player.jbl",
    name: "JBL",
    use_art_colors: true,
    tap_opens_popup: true,
    options: { show_volume_step_buttons: true },
    speaker_group: { entities: ["media_player.living_room"] },
    media_players: [
      {
        entity: "media_player.yandex",
        name: "Yandex",
        ma_entity_id: "media_player.yandex_ma",
        use_art_colors: false,
        tap_opens_popup: false,
        options: { hide_when_off: true },
        speaker_group: { entities: ["media_player.bedroom"] },
      },
    ],
  };

  const cards = getVirtualMediaPlayerCards(config);
  expect(cards).toHaveLength(2);
  expect(cards[0].media_players).toBeUndefined();
  expect(cards[1]).toMatchObject({
    entity_id: "media_player.yandex",
    name: "Yandex",
    ma_entity_id: "media_player.yandex_ma",
    use_art_colors: false,
    tap_opens_popup: false,
    options: { hide_when_off: true },
    speaker_group: { entities: ["media_player.bedroom"] },
  });
  expect(cards[1].options?.show_volume_step_buttons).toBeUndefined();
  expect(cards[1].speaker_group?.entities).not.toContain(
    "media_player.living_room"
  );

  const first = getMediocreLegacyConfigToMediocreMultiConfig(cards[0]);
  const second = getMediocreLegacyConfigToMediocreMultiConfig(cards[1]);
  expect(first).toMatchObject({ tap_opens_popup: true });
  expect(second).toMatchObject({ tap_opens_popup: false });
  expect(first.options?.show_volume_step_buttons).toBe(true);
  expect(second.options?.show_volume_step_buttons).toBe(false);
  expect(first.media_players.map(player => player.entity_id)).toEqual([
    "media_player.jbl",
    "media_player.living_room",
  ]);
  expect(second.media_players.map(player => player.entity_id)).toEqual([
    "media_player.yandex",
    "media_player.bedroom",
  ]);
});

it("upgrades existing short additional-player entries to separate cards", () => {
  const cards = getVirtualMediaPlayerCards({
    type: "custom:mediocre-media-player-card",
    entity_id: "media_player.main",
    media_players: [
      "media_player.one",
      { entity: "media_player.two", name: "Two" },
    ],
  });

  expect(cards.map(card => card.entity_id)).toEqual([
    "media_player.main",
    "media_player.one",
    "media_player.two",
  ]);
  expect(cards[2].name).toBe("Two");
});
