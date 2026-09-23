# Mediocre Media Player Card

A standard-sized media player card for Home Assistant. Supports grouping speakers (including volume management), custom action buttons, and search (when used with Music Assistant).

<img width="396" height="138" alt="image" src="https://github.com/user-attachments/assets/67f90222-8a6e-43e2-859d-980828a050a2" />

## Features

- Group/ungroup speakers
- Volume management for groups
- Custom action buttons
- Music Assistant search integration
- Media browser
- Visual editor for configuration, including additional players in the same card

## Screenshots

<img width="396" height="462" alt="image" src="https://github.com/user-attachments/assets/20f247d4-9fec-4e9b-8fd3-408e6854cfad" />
<img width="396" height="350" alt="image" src="https://github.com/user-attachments/assets/d25dd409-c320-433e-a62e-1cd27a340c9f" />

## Configuration

```yaml
type: "custom:mediocre-media-player-card"
entity_id: media_player.living_room_speaker
media_players:
  - media_player.kitchen_speaker
  - entity: media_player.bedroom_speaker
    name: Bedroom
    ma_entity_id: media_player.bedroom_music_assistant
    media_browser:
      - entity_id: media_player.bedroom_music_assistant
tap_opens_popup: true
speaker_group:
  entities:
    - media_player.kitchen_speaker
    - media_player.bedroom_speaker
```

In the visual editor, open **Additional media players (switch by button)** to add players. When there is more than one player, use **Configure player** inside that section to select the main or an additional player; only the selected player's fields appear below it. With one player, the main settings remain directly visible in the editor. Each player can have its own name, interactions, speaker grouping, Music Assistant and LMS entities, search, media browser, and custom buttons. Removing an additional player also removes it from the speaker group list. The compact card shows one player at a time and displays a switch button when there is more than one. The selected player stays visible until you press the button again. Players in `speaker_group.entities` are also available in the switch order.

The `media_players` list accepts entity IDs, `{entity, name}` entries, and objects with the per-player options above. Card-wide display options such as `use_art_colors`, `tap_opens_popup`, and `options.show_volume_step_buttons` remain shared.

## Options

| Option                                        | Type    | Default  | Description                                                                                                                                                                                |
| --------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                                        | string  | Required | Lovelace card type (should be `"custom:mediocre-media-player-card"`)                                                                                                                       |
| `entity_id`                                   | string  | Required | The entity ID of the media player                                                                                                                                                          |
| `media_players`                               | array   |          | Additional media players to display one at a time; accepts entity IDs or objects with `entity` and individual player settings                                                              |
| `use_art_colors`                              | boolean |          | Use artwork colors for the card                                                                                                                                                            |
| `action`                                      | object  |          | Tap/hold/double_tap action configuration (see actionTypes)                                                                                                                                 |
| `speaker_group`                               | object  |          | Speaker grouping configuration                                                                                                                                                             |
| `speaker_group.entity_id`                     | string  |          | Entity ID of the main speaker if different from the media player                                                                                                                           |
| `speaker_group.entities`                      | array   |          | List of entity IDs that can be grouped with the main speaker                                                                                                                               |
| `custom_buttons`                              | array   |          | List of custom buttons (icon, name, and action config)                                                                                                                                     |
| `ma_entity_id`                                | string  |          | Music Assistant entity id (adds search and queue management when paired with hass_queue)                                                                                                   |
| `ma_favorite_button_entity_id`                | string  |          | Music Assistant favorite button entity (shows a heart-plus button to mark the current song as favorite)                                                                                    |
| `lms_entity_id`                               | string  |          | LMS (lyrion) entity id. Adds queue transfer and queue management when paired with lyrion_cli.                                                                                              |
| `search`                                      | array   |          | List of objects (entity_id, name and media_types). Enables search ui using the search_media action.                                                                                        |
| `media_browser`                               | array   |          | List of objects (entity_id and name). Enables a built in media browser.                                                                                                                    |
| `options`                                     | object  |          | Additional display options                                                                                                                                                                 |
| `options.always_show_power_button`            | boolean |          | Always show the power button, even if the media player is on                                                                                                                               |
| `options.always_show_custom_buttons`          | boolean |          | Always show custom buttons panel expanded                                                                                                                                                  |
| `options.hide_when_off`                       | boolean |          | Hide the card when the media player is off                                                                                                                                                 |
| `options.hide_when_group_child`               | boolean |          | Hide the card when the media player is a group child                                                                                                                                       |
| `options.show_volume_step_buttons`            | boolean |          | Show volume `+`/`-` step buttons on volume sliders                                                                                                                                         |
| `options.use_volume_up_down_for_step_buttons` | boolean |          | Use `volume_up`/`volume_down` services for step buttons instead of `set_volume`                                                                                                            |
| `options.use_experimental_lms_media_browser`  | boolean |          | Replace the built-in media browser with an experimental lyrion_cli-based browser that includes global search and app access (e.g. Spotty, Qobuz). Requires `lms_entity_id` and lyrion_cli. |
| `tap_opens_popup`                             | boolean |          | When set to true, tapping the card opens a popup with the massive card                                                                                                                     |
