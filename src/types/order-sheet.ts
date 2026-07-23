export interface OrderSheet {
  id: string;
  order_code: string;
  team_name: string;
  captain_name: string;
captain_email: string;
  is_locked: boolean;
  created_at: string;
  category: string;
}

export interface CreateOrderSheetData {
  team_name: string;
  captain_name: string;
  captain_email: string;
   category: string;
}