import debounce from 'lodash.debounce';
import { Message } from '../message';
import { messages, spinnerWrapper, wrapper } from './messages.css';
import { ConversationState } from '~/messages/models/contexts/conversation.state';
import { SessionInformation } from '~/common/models/types/user.session';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { useTranslation } from '~/app/i18n/client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isEmpty } from '@djeka07/utils';
import { For, Spinner, Typography } from '@djeka07/ui';

type MessagesProps = {
  id: string;
  conversation?: ConversationState;
  currentUser?: UserResponse;
  loggedInUsers: SessionInformation[];
  onFetch?: () => Promise<void>;
  onMessagesRead?: (ids: string[]) => void;
};

const Messages = ({ id, loggedInUsers, conversation, currentUser, onFetch, onMessagesRead }: MessagesProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [messagesToSend, setMessagesToSend] = useState<string[]>([]);
  const unreadMessages = useMemo(
    () => conversation?.items?.filter((item) => isEmpty(item.readBy) && item.from?.userId !== currentUser?.id) || [],
    [conversation?.items, currentUser?.id],
  );

  const onScoll = useCallback(() => {
    if (
      !!ref.current &&
      ref?.current?.scrollTop < 500 &&
      conversation?.state !== 'pending' &&
      conversation?.hasNextPage &&
      conversation?.state !== 'pending-next'
    ) {
      onFetch?.();
    }

    // console.log(ref?.scrollTop, (ref?.scrollHeight as number) - (ref?.clientHeight as number));
  }, [conversation?.hasNextPage, conversation?.state, onFetch]);

  const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
    setTimeout(() => {
      ref?.current?.scrollTo({ top: ref?.current?.scrollHeight, left: 0, behavior });
      setHasScrolled(true);
    }, 0);
  };

  const onSend = debounce(
    () => {
      if (!isEmpty(messagesToSend)) {
        onMessagesRead?.(messagesToSend);
        setMessagesToSend([]);
      }
    },
    500,
    { leading: false, trailing: true },
  );

  const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setMessagesToSend((prev) => [...prev, entry.target.id]);
        observer.unobserve(entry.target);
      }
    });

    onSend();
  };

  useEffect(() => {
    if (!ref) {
      return;
    }
    scrollToBottom();
    ref?.current?.addEventListener('scroll', onScoll, { passive: true });
    return;
  }, [onScoll]);

  useEffect(() => {
    if (!ref || isEmpty(unreadMessages) || !onMessagesRead) {
      return;
    }
    let observers: IntersectionObserver[] = [];
    unreadMessages.forEach((message) => {
      const element = document.getElementById(message?.messageId);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, { root: ref?.current, threshold: 1 });
        observer.observe(element);
        observers = [...observers, observer];
      }

      return () => {
        observers.forEach((observer) => {
          observer.disconnect();
        });
      };
    });
  });

  useEffect(() => {
    if (!ref) {
      return;
    }
    if (id) {
      scrollToBottom();
    }
  }, [id]);

  // useEffect(() => {
  //   const prevLastMessage = prev?.at(-1);
  //   const lastMessage = props.conversation?.items?.at(-1);
  //   if (prevLastMessage?.messageId !== lastMessage?.messageId && lastMessage?.from?.userId === props.currentUser?.id) {
  //     scrollToBottom('smooth');
  //   }
  //   return () => {
  //     if (!ref) {
  //       return;
  //     }
  //     ref.current?.removeEventListener('scroll', onScoll);
  //   };
  // }, []);

  return (
    <div className={wrapper} ref={ref}>
      {conversation?.state === 'pending' ||
        (conversation === undefined && (
          <div className={spinnerWrapper}>
            <Spinner />
          </div>
        ))}
      {!conversation?.hasNextPage && conversation !== undefined && (
        <Typography marginBottom="medium" align="center" variant="h4">
          {t('common:label:start-of-conversation')}
        </Typography>
      )}
      <div className={messages({ show: hasScrolled })}>
        <For each={conversation?.items} keyed="messageId">
          {(s, index) => (
            <Message
              currentUser={currentUser}
              isGroup={conversation?.isGroup}
              index={index}
              isLastMessage={(conversation?.items?.length || 0) - 1 === index}
              item={s}
              users={conversation?.users}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default Messages;
