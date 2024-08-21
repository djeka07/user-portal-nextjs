'use client';
import { useMemo, useState } from 'react';
import { message, selectAllCheckbox } from './users-form-part.css';
import { useTranslation } from '~/app/i18n/client';
import { UsersResponse } from '~/users/models/services/generated/user.generated';
import { Checkbox, For, Icon, Message, Typography } from '@djeka07/ui';

type UsersFormPartProps = {
  users: UsersResponse;
  errors?: string[];
};

const UsersFormPart = ({ users, errors }: UsersFormPartProps) => {
  const { t } = useTranslation();
  const [selectAll, setSelectAll] = useState(false);
  const toggleCheckAll = () => setSelectAll((prev) => !prev);
  const hasUsers = useMemo(() => users.total > 0, [users.total]);

  return (
    <>
      <Typography marginBottom="small" color="grey700" variant="h3">
        {hasUsers ? 'Choose users' : 'No users'}
      </Typography>
      {hasUsers && (
        <Checkbox
          name="select-all"
          className={selectAllCheckbox}
          label={selectAll ? 'Unselect all' : 'Select all'}
          onChange={toggleCheckAll}
        />
      )}
      <ul>
        <For each={users.users} keyed="id">
          {(user) => (
            <li>
              <Checkbox
                defaultChecked={selectAll}
                value={user.id}
                name="users"
                label={`${user.firstName} ${user.lastName}`}
              />
            </li>
          )}
        </For>
      </ul>
      <Message margin={{ bottom: 4 }} className={message} show={!!errors?.[0]} error>
        <Icon name="AlertCircle" color="error" />
        {t(errors?.[0] as string)}
      </Message>
    </>
  );
};

export default UsersFormPart;
