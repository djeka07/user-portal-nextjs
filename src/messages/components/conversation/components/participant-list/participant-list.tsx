import { For } from '@djeka07/ui';
import { UserResponse } from '~/messages/models/services/generated/message.generated';

type ParticipantListProps = {
  users: UserResponse[];
};

const ParticipantList = ({ users }: ParticipantListProps) => (
  <div>
    <For each={users} keyed="userId">
      {(item) => <div>{item.firstName}</div>}
    </For>
  </div>
);

export default ParticipantList;
