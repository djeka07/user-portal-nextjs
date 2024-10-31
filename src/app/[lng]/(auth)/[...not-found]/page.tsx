import { Typography } from '@djeka07/ui';

type NotFoundProps = {
  params: Promise<{ lng: string }>;
};

const NotFound = async ({ params }: NotFoundProps) => {
  return <Typography variant="h1">Sidan hittades inte</Typography>;
};

export default NotFound;
