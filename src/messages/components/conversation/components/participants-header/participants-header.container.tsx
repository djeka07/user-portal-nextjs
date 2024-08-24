'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '~/auth/models/hooks/use-auth';
import { useSocket } from '~/common/models/hooks';
import { useConversations } from '~/messages/models/hooks/use-conversations';
import ParticipantsHeader from './participants-header';
import ParticipantsHeaderSkeleton from './participants-header.skeleton';

type ParticipantsContainerProps = { id: string };

const ParticipantsContainer = (props: ParticipantsContainerProps) => {
  const navigate = useRouter();
  const [authState] = useAuth();
  const [state] = useConversations();
  const conversation = Object.values(state.conversations)?.find((i) => i.conversationId === props.id);

  const { loggedInUsers } = useSocket();

  const onBackClick = () => {
    navigate.replace('/messages');
  };

  return !!conversation && conversation?.state !== 'pending' ? (
    <ParticipantsHeader
      onBackClick={onBackClick}
      loggedInUsers={loggedInUsers}
      conversation={conversation}
      currentUser={authState.user}
    />
  ) : (
    <ParticipantsHeaderSkeleton />
  );
};

export default ParticipantsContainer;