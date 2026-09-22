import type { MediaPlayerEntity, MediocreMultiMediaPlayer } from "@types";

export const getVolumeControlTarget = (
  player: MediocreMultiMediaPlayer,
  entity: Pick<MediaPlayerEntity, "attributes"> | undefined
) => {
  const isMusicAssistantPlayer =
    player.ma_entity_id === player.entity_id ||
    entity?.attributes?.mass_player_type !== undefined;

  return {
    entityId: isMusicAssistantPlayer
      ? player.entity_id
      : (player.speaker_group_entity_id ?? player.entity_id),
    syncGroupChildren: !isMusicAssistantPlayer,
  };
};
