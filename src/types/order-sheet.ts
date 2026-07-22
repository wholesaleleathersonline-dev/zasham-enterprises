export interface OrderSheet {
  id: string;
  order_code: string;
  team_name: string;
  is_locked: boolean;
  created_at: string;
}

export interface CreateOrderSheetData {
  team_name: string;
}