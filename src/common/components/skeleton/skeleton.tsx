import { For } from '@djeka07/ui';
import { skeleton, SkeletonVariants, wrapper } from './skeleton.css';
import { css } from '@djeka07/utils';

type SkeletonProps = SkeletonVariants & {
  amount?: number;
  width?: string;
  height?: string;
  className?: string;
};

const Skeleton = ({ amount = 1, height = '30px', width = '100%', radius = 'medium', className }: SkeletonProps) => (
  <div className={css(className, wrapper)}>
    <For keyed={(i, index) => `${i}-${index}`} each={[...new Array(amount)]}>
      {() => <div style={{ width, height }} className={skeleton({ radius })} />}
    </For>
  </div>
);

export default Skeleton;
