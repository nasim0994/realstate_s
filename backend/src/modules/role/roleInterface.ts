export interface IPermission {
  route: string;
  all: boolean;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface IRole {
  name: string;
  permissions: IPermission[];
}
