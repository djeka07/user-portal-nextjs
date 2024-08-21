import { Role, RoleResponse, UserResponse } from '~/users/models/services/generated/user.generated';

export const isAdministrator = (user: UserResponse, roles: RoleResponse[]) => {
  const adminRole = roles?.find((role) => role.name === Role.Administrator);
  return !!user?.roles.find((role) => role.id === adminRole?.id);
};
