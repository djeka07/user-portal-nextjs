import { UserResponse } from '~/users/models/services/generated/user.generated';
import { icon, name, numberOfUsers, userItem, users as usersClass } from './users.css';
import { SessionInformation } from '~/common/models/types/user.session';
import { For, Icon, UserBadge } from '@djeka07/ui';
import { Link } from '~/common/components/links';
import { useTranslation } from '~/app/i18n/client';

export interface UsersSideList extends UserResponse, SessionInformation {}

type UsersProps = {
  users: UsersSideList[];
  selectedUserId?: string;
  total: number;
};

const Users = ({ total, users, selectedUserId }: UsersProps) => {
  const { t, language } = useTranslation();
  console.log(users);
  return (
    <>
      <div className={usersClass}>
        <For each={users} keyed="id">
          {(user) => (
            <Link
              href={`/${language}/users/${user.id}`}
              className={userItem({
                selected: selectedUserId === user.id,
                online: user.online,
              })}
            >
              <UserBadge user={user} />
              <span className={name}>{user.firstName}</span> <span className={name}>{user.lastName}</span>
              {!user.hasGrantedAccess && <Icon className={icon} name="Slash" color="menu" />}
            </Link>
          )}
        </For>
      </div>
      <div className={numberOfUsers}>{t('users:users-list:number-of-users', { count: `${total}` })}</div>
    </>
  );
};

export default Users;
