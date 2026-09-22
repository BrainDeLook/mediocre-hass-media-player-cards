import { getVolumeControlTarget } from "./getVolumeControlTarget";
import type { MediocreMultiMediaPlayer } from "@types";

describe("getVolumeControlTarget", () => {
  it("uses the selected Music Assistant player instead of its group entity", () => {
    const player: MediocreMultiMediaPlayer = {
      entity_id: "media_player.jbl_bar_300_4",
      ma_entity_id: "media_player.jbl_bar_300_4",
      speaker_group_entity_id: "media_player.gostinaia",
    };

    expect(getVolumeControlTarget(player, undefined)).toEqual({
      entityId: "media_player.jbl_bar_300_4",
      syncGroupChildren: false,
    });
  });

  it("recognizes a Music Assistant entity by its attributes", () => {
    const player: MediocreMultiMediaPlayer = {
      entity_id: "media_player.music_assistant",
      speaker_group_entity_id: "media_player.speaker",
    };
    const entity = {
      attributes: { mass_player_type: "player" },
    };

    expect(getVolumeControlTarget(player, entity)).toEqual({
      entityId: "media_player.music_assistant",
      syncGroupChildren: false,
    });
  });

  it("keeps the speaker group target for other players", () => {
    const player: MediocreMultiMediaPlayer = {
      entity_id: "media_player.living_room",
      speaker_group_entity_id: "media_player.group",
    };

    expect(getVolumeControlTarget(player, undefined)).toEqual({
      entityId: "media_player.group",
      syncGroupChildren: true,
    });
  });
});
