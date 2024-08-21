import fetchApplicationsAction from '~/users/models/actions/fetch-applications';
import UserAccessForm from './users-access-form';
import fetchUsersAction from '~/users/models/actions/fetch-users';
import updateUsersAccessAction from '~/users/models/actions/update-users-access';

const UserAccessFormContainer = async () => {
  const appData = fetchApplicationsAction(1, 100);
  const usersData = fetchUsersAction(1, 100, false);

  const [applications, users] = await Promise.all([appData, usersData]);

  const onSuccess = () => {
    console.log('success');
  };

  return <UserAccessForm action={updateUsersAccessAction} users={users} appData={applications} onSuccess={onSuccess} />;
};

export default UserAccessFormContainer;
