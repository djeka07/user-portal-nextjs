import { Skeleton } from '@djeka07/ui';
import { skeletonRoot, skeletonContent } from './conversations.css';

const ConversationsSkeleton = () => (
  <div className={skeletonRoot}>
    <Skeleton height="50px" width="50px" radius="round" />
    <div className={skeletonContent}>
      <Skeleton height="19px" width="50%" />
      <Skeleton height="17px" width="30%" />
      <Skeleton height="14.5px" width="70%" />
    </div>
  </div>
);

export default ConversationsSkeleton;
