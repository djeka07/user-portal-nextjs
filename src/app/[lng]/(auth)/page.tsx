import { Typography } from '@djeka07/ui';
import { getSession } from '~/app/test/session';
import { getSelfRequest } from '~/users/models/services/user.service';

type IndexProps = {
  params: { lng: string };
};

const Index = async ({ params: { lng } }: IndexProps) => {
  const session = await getSession();
  const user = await getSelfRequest({ accessToken: session!.accessToken });
  return (
    <Typography variant="h1">
      Hejsan {user.firstName} {user.lastName}
    </Typography>
  );
};

export default Index;
