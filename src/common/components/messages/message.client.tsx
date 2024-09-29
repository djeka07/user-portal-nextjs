'use client';
import { Message } from '@djeka07/ui';
import { MessageProps } from '@djeka07/ui/src/components/atoms/messages/message.props';

const MessageClient = (props: MessageProps) => <Message {...props}>{props.children}</Message>;
export default MessageClient;
