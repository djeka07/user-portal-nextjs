'use client';
import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import { RoleResponse, UserResponse } from '~/users/models/services/generated/user.generated';
import { Authorization } from '../helpers/token';
import { isAdministrator } from '../helpers/administrator';

export type AuthProviderProps = {
  initialToken: Authorization;
  initialUser: UserResponse;
  initialRoles: RoleResponse[];
  children: ReactNode;
};

export type AuthState = {
  token: Authorization | null;
  user: UserResponse | null;
  roles: RoleResponse[];
};

export type AuthContextActions = {
  updateToken: (token: Authorization) => void;
  updateUser: (user: UserResponse) => void;
  updateRoles: (roles: RoleResponse[]) => void;
  isAdmin: () => boolean;
};

export type AuthContextType = [AuthState, AuthContextActions];

const initialContext: AuthContextType = [
  {
    token: null,
    user: null,
    roles: [],
  },
  {
    updateToken: () => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    updateUser: () => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    updateRoles: () => {
      throw new Error('AuthProvider updateToken not assigned');
    },
    isAdmin: () => {
      throw new Error('AuthProvider isAdmin not assigned');
    },
  },
];

export const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider = (props: AuthProviderProps) => {
  const [token, setToken] = useState(props.initialToken);
  const [user, setUser] = useState(props.initialUser);
  const [roles, setRoles] = useState(props.initialRoles);

  const state = useMemo(() => ({ token, user, roles }), [token, user, roles]);

  const updateToken = useCallback((newToken: Authorization) => {
    setToken(newToken);
  }, []);

  const updateRoles = useCallback((roles: RoleResponse[]) => {
    setRoles(roles);
  }, []);

  const updateUser = useCallback((user: UserResponse) => {
    setUser(user);
  }, []);

  const isAdmin = useCallback(() => isAdministrator(user, roles), [user, roles]);

  const context: AuthContextType = [state, { updateToken, updateRoles, updateUser, isAdmin }];

  return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
};
