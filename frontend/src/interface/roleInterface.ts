export interface IPermission {
  route: string;
  all: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  read: boolean;
}

export interface IRole {
  _id: string;
  name: string;
  permissions: IPermission[];
}

export interface IShowRolePermissionsProps {
  role: {
    _id: string;
    name: string;
    permissions: IPermission[];
  };
  showPermission: boolean;
  setShowPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IEditRolePermissionsProps {
  role: {
    _id: string;
    name: string;
    permissions: IPermission[];
  };
  editPermissionOpen: boolean;
  setEditPermissionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
