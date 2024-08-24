import { UserResponse } from '~/messages/models/services/generated/message.generated';
import { participants } from './participants-names.css';
import { For, Typography } from '@djeka07/ui';

type ParticipantsProps = {
  conversationName?: string;
  items: UserResponse[];
};

const ParticipantsName = ({ items, conversationName }: ParticipantsProps) => (
  <span className={participants}>
    {conversationName ? (
      <Typography as="span" variant="body" size="small">
        {conversationName}
      </Typography>
    ) : (
      <For each={items} keyed="userId">
        {(user, index) => (
          <Typography as="span" variant="body" size="small">
            {`${user.firstName}${index === items.length - 1 ? '' : ', '}`}
          </Typography>
        )}
      </For>
    )}
  </span>
);

export default ParticipantsName;
