'use client';
import { useState } from 'react';
import { CreateUserFormContainer } from '../create-user-form';
import { root, wrapper } from './create-user-item.css';
import { Button, Icon, PanelContainer, PanelContent, PanelSize, Typography } from '@djeka07/ui';
import { useTranslation } from '~/app/i18n/client';

const CreateUserItem = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={root}>
        <div className={wrapper}>
          <Icon color="heading" size="xxlarge" name="UserPlus" />
          <Typography variant="h3">{t('users:users-view:create')}</Typography>
          <Button onClick={() => setShow(true)}>{t('common:button:create')}</Button>
        </div>
      </div>
      {show && (
        <PanelContainer panelElementProps={{ maxWidth: PanelSize.Xsmall }} afterPanelClosed={() => setShow(false)}>
          {(props) => (
            <PanelContent>
              <CreateUserFormContainer onSuccess={() => props.closePanel()} onCancel={() => props.closePanel()} />
            </PanelContent>
          )}
        </PanelContainer>
      )}
    </>
  );
};

export default CreateUserItem;
