export interface Player {
  id: string;
  order_sheet_id: string;

  player_number: string;
  player_name: string;

  top_size: string;
  bottom_size: string;

  shorts_style: string;
  hood: string;

  special_request: string | null;

  created_at: string;
}

export interface CreatePlayerData {
  order_sheet_id: string;

  player_number: string;
  player_name: string;

  top_size: string;
  bottom_size: string;

  shorts_style: string;
  hood: string;

  special_request?: string;
}