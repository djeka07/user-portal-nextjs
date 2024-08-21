'use client';
import { message } from './applications-form-part.css';
import { selectAllCheckbox } from '../users-form-part/users-form-part.css';
import { GetApplicationsResponse } from '~/users/models/services/generated/user.generated';
import { useState } from 'react';
import { Checkbox, For, Icon, Message, Typography } from '@djeka07/ui';
import { useTranslation } from '~/app/i18n/client';

type ApplicationFormPartProps = {
  applications: GetApplicationsResponse['applications'];
  errors?: string[];
};

const ApplicationFormPart = ({ applications, errors }: ApplicationFormPartProps) => {
  const { t } = useTranslation();
  const [selectAll, setSelectAll] = useState(false);
  const toggleCheckAll = () => setSelectAll((prev) => !prev);

  return (
    <>
      <Typography marginBottom="small" color="grey700" variant="h3">
        Choose applications
      </Typography>
      <Checkbox
        name="select-all"
        className={selectAllCheckbox}
        label={selectAll ? 'Unselect all' : 'Select all'}
        onChange={toggleCheckAll}
      />
      <ul>
        <For each={applications} keyed="appId">
          {(item) => (
            <li>
              <Checkbox name="applicationIds" defaultChecked={selectAll} label={item.appName} value={item.appId} />
            </li>
          )}
        </For>
      </ul>
      <Message margin={{ bottom: 8 }} className={message} error show={!!errors?.[0]}>
        <Icon name="AlertCircle" color="error" />
        {t(errors?.[0] as string) as string}
      </Message>
    </>
  );
};
export default ApplicationFormPart;
