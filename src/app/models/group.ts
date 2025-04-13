export interface Group {
  id: string;
  name: string;
  owner: string;
  icon?: string;
  userIds?: string[];
  canEdit?: string[];
}
