export type AvailablePincode = {
  id: string;
  pincode: string;
  city: string;
  created_at: string;
};

export type UserAddress = {
  id: string;
  user_id: string;
  name: string;
  flat_house_building: string;
  area_street_block: string;
  pincode: string;
  city: string;
  address_type: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type Note = {
  id: string;
  user_id: string;
  name: string;
  lists: string[];
  color: 'brown-300' | 'blue-200' | 'orange-300' | 'green-300';
  created_at: string;
  updated_at: string;
};
