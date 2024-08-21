import { Typography } from '@djeka07/ui';

type NotFoundProps = {
  params: { lng: string };
};

const NotFound = async ({ params: { lng } }: NotFoundProps) => {
  return <Typography variant="h1">Sidan hittades inte</Typography>;
};

export default NotFound;
