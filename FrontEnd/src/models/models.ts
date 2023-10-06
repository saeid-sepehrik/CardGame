export interface IGroupType {
  _id: string;
  title: string;
  is_active: boolean;
  pic_path: string;
  dsc: string;
}

export interface IScenario {
  _id: string;
  id_game_type: string;
  title: string;
  title_fn: string;
  code: number;
  is_active: boolean;
  pic_path: string;
  dsc: string;
}

export interface IRole {
  _id?: string;
  title: string;
  title_fn: string;
  is_active: boolean;
  mask_code_scenarios: number;
  just_one: boolean;
  pic_path: string;
  dsc?: string;
  group: string;
  color: string;
}

export interface IGameRole {
  _id: string;
  id_game: string;
  id_role: string;
  id_user: string;
  status: number;
  score: number;
  newMessage: boolean;
}

export interface IGame {
  _id: string;
  code_scenario: number;
  title_game_type: string;
  title_scenario: string;
  status: number;
  code: number;
}

export interface Iplayer {
  _id: string;
  name: string;
  id_game: string;
}
