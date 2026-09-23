import { MediocreMediaPlayerCardConfig } from "@types";

/** Build a separate standard card configuration for each configured player. */
export const getVirtualMediaPlayerCards = (
  config: MediocreMediaPlayerCardConfig
): MediocreMediaPlayerCardConfig[] => {
  const { media_players, ...mainCard } = config;

  return [
    mainCard,
    ...(media_players ?? []).map(entry => {
      const player = typeof entry === "string" ? { entity: entry } : entry;
      const {
        entity,
        speaker_group_entity_id,
        can_be_grouped: _can_be_grouped,
        ...settings
      } = player;
      return {
        type: config.type,
        entity_id: entity,
        ...settings,
        ...(settings.speaker_group
          ? {}
          : speaker_group_entity_id
            ? {
                speaker_group: {
                  entity_id: speaker_group_entity_id,
                  entities: [],
                },
              }
            : {}),
      };
    }),
  ];
};
