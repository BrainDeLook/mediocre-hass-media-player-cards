import {
  MediocreMediaPlayerCardConfig,
  MediocreMassiveMediaPlayerCardConfig,
} from "@types";
import { getSearchEntryArray } from "./getSearchEntryArray";

/**
 * Creates default values from a regular media player card config
 */
export const getDefaultValuesFromConfig = (
  config: MediocreMediaPlayerCardConfig
): MediocreMediaPlayerCardConfig => ({
  type: config.type ?? `custom:mediocre-media-player-card`,
  entity_id: config?.entity_id ?? "",
  ...(config.media_players
    ? {
        media_players: config.media_players.map(entry => {
          const player = typeof entry === "string" ? { entity: entry } : entry;
          const { speaker_group_entity_id, ...settings } = player;
          return {
            ...settings,
            use_art_colors: player.use_art_colors ?? false,
            tap_opens_popup: player.tap_opens_popup ?? false,
            speaker_group: {
              entity_id:
                player.speaker_group?.entity_id ??
                speaker_group_entity_id ??
                null,
              entities: player.speaker_group?.entities ?? [],
            },
            search: getSearchEntryArray(player.search, player.entity),
            media_browser: player.media_browser
              ? Array.isArray(player.media_browser)
                ? player.media_browser
                : [
                    {
                      entity_id:
                        player.media_browser.entity_id ?? player.entity,
                    },
                  ]
              : [],
            options: {
              always_show_power_button:
                player.options?.always_show_power_button ?? false,
              always_show_custom_buttons:
                player.options?.always_show_custom_buttons ?? false,
              hide_when_off: player.options?.hide_when_off ?? false,
              hide_when_group_child:
                player.options?.hide_when_group_child ?? false,
              show_volume_step_buttons:
                player.options?.show_volume_step_buttons ?? false,
              use_volume_up_down_for_step_buttons:
                player.options?.use_volume_up_down_for_step_buttons ?? false,
              use_experimental_lms_media_browser:
                player.options?.use_experimental_lms_media_browser ?? false,
            },
          };
        }),
      }
    : {}),
  name: config?.name ?? null,
  use_art_colors: config?.use_art_colors ?? false,
  tap_opens_popup: config?.tap_opens_popup ?? false,
  action: config?.action ?? {},
  speaker_group: {
    entity_id: config?.speaker_group?.entity_id ?? null,
    entities: config?.speaker_group?.entities ?? [],
  },
  search: getSearchEntryArray(config.search, config.entity_id),
  media_browser: config?.media_browser
    ? Array.isArray(config.media_browser)
      ? config.media_browser
      : [{ entity_id: config.media_browser.entity_id ?? config.entity_id }]
    : null,
  ma_entity_id: config?.ma_entity_id ?? null,
  ma_favorite_button_entity_id: config?.ma_favorite_button_entity_id ?? null,
  lms_entity_id: config?.lms_entity_id ?? null,
  custom_buttons: config?.custom_buttons ?? [],
  options: {
    always_show_power_button:
      config?.options?.always_show_power_button ?? false,
    always_show_custom_buttons:
      config?.options?.always_show_custom_buttons ?? false,
    hide_when_off: config?.options?.hide_when_off ?? false,
    hide_when_group_child: config?.options?.hide_when_group_child ?? false,
    show_volume_step_buttons:
      config?.options?.show_volume_step_buttons ?? false,
    use_volume_up_down_for_step_buttons:
      config?.options?.use_volume_up_down_for_step_buttons ?? false,
    use_experimental_lms_media_browser:
      config?.options?.use_experimental_lms_media_browser ?? false,
  },
  grid_options: config?.grid_options,
  visibility: config?.visibility,
});

/**
 * Creates default values from a massive media player card config
 */
export const getDefaultValuesFromMassiveConfig = (
  config: MediocreMassiveMediaPlayerCardConfig
): MediocreMassiveMediaPlayerCardConfig => ({
  type: config.type ?? `custom:mediocre-massive-media-player-card`,
  entity_id: config?.entity_id ?? "",
  use_art_colors: config?.use_art_colors ?? false,
  mode: config?.mode ?? "card",
  action: config?.action ?? {},
  speaker_group: {
    entity_id: config?.speaker_group?.entity_id ?? null,
    entities: config?.speaker_group?.entities ?? [],
  },
  search: getSearchEntryArray(config.search, config.entity_id),
  media_browser: config?.media_browser
    ? Array.isArray(config.media_browser)
      ? config.media_browser
      : [{ entity_id: config.media_browser.entity_id ?? config.entity_id }]
    : null,
  ma_entity_id: config?.ma_entity_id ?? null,
  ma_favorite_button_entity_id: config?.ma_favorite_button_entity_id ?? null,
  lms_entity_id: config?.lms_entity_id ?? null,
  custom_buttons: config?.custom_buttons ?? [],
  options: {
    always_show_power_button:
      config?.options?.always_show_power_button ?? false,
    show_volume_step_buttons:
      config?.options?.show_volume_step_buttons ?? false,
    use_volume_up_down_for_step_buttons:
      config?.options?.use_volume_up_down_for_step_buttons ?? false,
    use_experimental_lms_media_browser:
      config?.options?.use_experimental_lms_media_browser ?? false,
  },
  grid_options: config?.grid_options,
  visibility: config?.visibility,
});

/**
 * Removes unnecessary values from regular media player card config while preserving grid_options
 */
export const getSimpleConfigFromFormValues = (
  formValues: MediocreMediaPlayerCardConfig
): MediocreMediaPlayerCardConfig => {
  const config: MediocreMediaPlayerCardConfig = { ...formValues };

  // Always preserve the name field (can be string or null)

  // Remove falsy or empty values
  if (!config.use_art_colors) delete config.use_art_colors;
  if (!config.tap_opens_popup) delete config.tap_opens_popup;
  if (!config.action || Object.keys(config.action).length === 0)
    delete config.action;
  if (!config.ma_entity_id) delete config.ma_entity_id;

  // Only preserve ma_favorite_button_entity_id if it is a non-empty string
  if (!config.ma_favorite_button_entity_id) {
    delete config.ma_favorite_button_entity_id;
  }

  if (!config.lms_entity_id) delete config.lms_entity_id;
  if (!config.custom_buttons || config.custom_buttons.length === 0)
    delete config.custom_buttons;
  if (!config.media_players || config.media_players.length === 0) {
    delete config.media_players;
  } else {
    config.media_players = config.media_players.map(entry => {
      if (typeof entry === "string") return entry;
      const player = { ...entry };
      if (!player.use_art_colors) delete player.use_art_colors;
      if (!player.tap_opens_popup) delete player.tap_opens_popup;
      if (
        !player.speaker_group?.entity_id &&
        !player.speaker_group?.entities?.length
      )
        delete player.speaker_group;
      if (Array.isArray(player.search) && player.search.length === 0)
        delete player.search;
      if (
        Array.isArray(player.media_browser) &&
        player.media_browser.length === 0
      )
        delete player.media_browser;
      if (!player.custom_buttons?.length) delete player.custom_buttons;
      if (player.options) {
        const options = { ...player.options };
        for (const key of Object.keys(options) as (keyof typeof options)[]) {
          if (options[key] === false || options[key] === null)
            delete options[key];
        }
        if (Object.keys(options).length) player.options = options;
        else delete player.options;
      }
      return player;
    });
  }

  if (config.speaker_group?.entity_id === null) {
    delete config.speaker_group.entity_id;
  }

  // Handle speaker_group - remove if no entity_id and no entities
  if (
    !config.speaker_group?.entity_id &&
    (!config.speaker_group?.entities ||
      config.speaker_group.entities.length === 0)
  ) {
    delete config.speaker_group;
  }

  if (config.options?.always_show_power_button === false) {
    delete config.options.always_show_power_button;
  }
  if (config.options?.always_show_custom_buttons === false) {
    delete config.options.always_show_custom_buttons;
  }
  if (config.options?.hide_when_off === false) {
    delete config.options.hide_when_off;
  }
  if (config.options?.hide_when_group_child === false) {
    delete config.options.hide_when_group_child;
  }

  if (config.options?.show_volume_step_buttons === false) {
    delete config.options.show_volume_step_buttons;
  }
  if (config.options?.use_volume_up_down_for_step_buttons === false) {
    delete config.options.use_volume_up_down_for_step_buttons;
  }
  if (config.options?.use_experimental_lms_media_browser === false) {
    delete config.options.use_experimental_lms_media_browser;
  }

  if (Object.keys(config.options ?? {}).length === 0) {
    delete config.options;
  }

  // Always preserve grid_options and visibility as theyr'e Home Assistant configurations
  // that we should not mess with

  // Normalize search to array format
  config.search = getSearchEntryArray(config.search, config.entity_id);
  if (Array.isArray(config.search) && config.search.length === 0) {
    delete config.search;
  }
  // Do NOT delete config.name, even if falsy/null

  return config;
};

export const removeAdditionalMediaPlayer = (
  config: MediocreMediaPlayerCardConfig,
  index: number
): MediocreMediaPlayerCardConfig => {
  const selected = config.media_players?.[index];
  if (!selected) return config;

  const media_players = config.media_players?.filter(
    (_, playerIndex) => playerIndex !== index
  );

  return getSimpleConfigFromFormValues({
    ...config,
    media_players,
  });
};

/**
 * Removes unnecessary values from massive media player card config while preserving grid_options
 */
export const getSimpleConfigFromMassiveFormValues = (
  formValues: MediocreMassiveMediaPlayerCardConfig
): MediocreMassiveMediaPlayerCardConfig => {
  const config: MediocreMassiveMediaPlayerCardConfig = { ...formValues };

  // Remove falsy or empty values
  if (!config.use_art_colors) delete config.use_art_colors;
  if (!config.action || Object.keys(config.action).length === 0)
    delete config.action;
  if (!config.ma_entity_id) delete config.ma_entity_id;

  // Only preserve ma_favorite_button_entity_id if it is a non-empty string
  if (!config.ma_favorite_button_entity_id) {
    delete config.ma_favorite_button_entity_id;
  }

  if (!config.lms_entity_id) delete config.lms_entity_id;
  if (!config.custom_buttons || config.custom_buttons.length === 0)
    delete config.custom_buttons;

  if (config.speaker_group?.entity_id === null) {
    delete config.speaker_group.entity_id;
  }

  // Handle speaker_group - remove if no entity_id and no entities
  if (
    !config.speaker_group?.entity_id &&
    (!config.speaker_group?.entities ||
      config.speaker_group.entities.length === 0)
  ) {
    delete config.speaker_group;
  }

  if (config.options?.always_show_power_button === false) {
    delete config.options.always_show_power_button;
  }
  if (config.options?.show_volume_step_buttons === false) {
    delete config.options.show_volume_step_buttons;
  }
  if (config.options?.use_volume_up_down_for_step_buttons === false) {
    delete config.options.use_volume_up_down_for_step_buttons;
  }
  if (config.options?.use_experimental_lms_media_browser === false) {
    delete config.options.use_experimental_lms_media_browser;
  }

  if (Object.keys(config.options ?? {}).length === 0) {
    delete config.options;
  }

  // Always preserve grid_options and visibility as theyr'e Home Assistant configurations
  // that we should not mess with

  // Normalize search to array format
  config.search = getSearchEntryArray(config.search, config.entity_id);
  if (Array.isArray(config.search) && config.search.length === 0) {
    delete config.search;
  }

  return config;
};
