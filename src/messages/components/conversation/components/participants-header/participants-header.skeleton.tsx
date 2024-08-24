import { Skeleton } from '@djeka07/ui';
import { infoSkeleton, participantsWrapper, root, statusWrapper } from './participants-header.css';

const ParticipantsHeaderSkeleton = () => (
  <div className={root}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton height="50px" width="50px" radius="round" />
        <div className={participantsWrapper}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Skeleton height="17px" width="50px" />
            <Skeleton height="17px" width="50px" />
          </div>
          <div className={statusWrapper}>
            <Skeleton height="10px" width="10px" />
            <Skeleton height="10px" width="50px" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <Skeleton className={infoSkeleton} height="30px" width="30px" radius="round" />
    </div>
  </div>
);

export default ParticipantsHeaderSkeleton;
