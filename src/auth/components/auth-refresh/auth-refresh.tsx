import { FetchState } from '~/common/models/types/fetch.state';
import { root, motionClass } from './auth-refresh.css';
import { AnimatePresence, motion } from 'framer-motion';
import { KeyboardEvent, useCallback } from 'react';
import { isEnter } from '@djeka07/utils';
import { Icon, Spinner, Typography } from '@djeka07/ui';
import Switch, { Match } from '@djeka07/ui/src/components/atoms/switch/switch';

type AuthRefresh = {
  onClose: () => void;
  show: boolean;
  state: FetchState;
};

const AuthRefresh = ({ onClose, show, state }: AuthRefresh) => {
  const enter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isEnter(e)) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div className={motionClass} initial={{ x: '100%' }} animate={{ x: '0px' }} exit={{ x: '100%' }}>
          <div tabIndex={0} role="button" onKeyDown={enter} className={root} onClick={onClose}>
            <Switch expression={state}>
              <Match when="pending">
                <>
                  <Spinner margin="no" size="small" color="dark" />
                  <Typography size="small" weight="bold">
                    Refreshing token
                  </Typography>
                </>
              </Match>
              <Match when="ready">
                <>
                  <Icon size="large" color="success" name="UserSuccess" />
                  <Typography size="small" weight="bold">
                    Token refreshed
                  </Typography>
                </>
              </Match>
              <Match when="errored">
                <>
                  <Spinner margin="no" size="small" color="error" />
                  <Typography size="small" weight="bold">
                    Something went wrong, logging out
                  </Typography>
                </>
              </Match>
            </Switch>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthRefresh;
