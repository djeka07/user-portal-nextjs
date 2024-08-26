import { For, Match, PillInput, Spinner, Switch, Typography, UserBadge } from '@djeka07/ui';
import { isEnter } from '@djeka07/utils';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useClickOutside } from '~/common/models/hooks';
import { ProgressState } from '~/common/models/types/fetch.state';
import { UserResponse, UsersResponse } from '~/users/models/services/generated/user.generated';
import { popupContent, root, user } from './user-pill-input.css';

type UserPillInputProps = {
  onInputChange: (val: string) => Promise<void>;
  onUserClick: (user: UserResponse) => Promise<void>;
  onDelete: (id: string) => void;
  state: ProgressState<UsersResponse>;
  pills: { id: string; label: string }[];
};

const UserPillInput = ({ onDelete, onInputChange, onUserClick, pills, state }: UserPillInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    popupRef,
    (e) => {
      console.log('clicked outside on modal. Target = ', e.target);
    },
    { shouldInjectEvent: true },
  );
  const [focus, setFocus] = useState(false);
  const pillsIds = useMemo(() => pills.map((p) => p.id), [pills]);
  const filteredUsers = useMemo(
    () => state.data?.users?.filter((u) => !pillsIds?.includes(u.id)),
    [pillsIds, state.data?.users],
  );

  const internalOnInputChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: val } = event.target;
      onInputChange(val);
    },
    500,
    { leading: false, trailing: true },
  );

  const internalOnUserClick = (user: UserResponse) => {
    onUserClick(user);
    if (ref.current) {
      ref.current.value = '';
      ref.current.focus();
    }
  };
  return (
    <div className={root}>
      <PillInput
        ref={ref}
        pills={pills}
        type="text"
        onDeletePill={onDelete}
        onFocus={() => setFocus(true)}
        onChange={internalOnInputChange}
        name="to"
        label="To:"
      />
      <AnimatePresence>
        {focus && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: '0px' }}
          >
            <div className={popupContent}>
              <Switch expression={state.state} fallback={<Spinner />}>
                <Match when="initial">
                  <Typography weight="bold">Type to search users</Typography>
                </Match>
                <Match when="ready">
                  <For each={filteredUsers} keyed="id">
                    {(item) => (
                      <div
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => (isEnter(e) ? onUserClick(item) : undefined)}
                        className={user}
                        onClick={() => internalOnUserClick(item)}
                      >
                        <UserBadge user={item} />
                        <span>
                          {item.firstName} {item.lastName}
                        </span>
                      </div>
                    )}
                  </For>
                </Match>
              </Switch>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPillInput;
