// eslint-disable-next-line no-restricted-imports
import RouterLink from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import { LinkStyleVariants, link } from './link.css';
import { css } from '@djeka07/utils';

type LinkProps = LinkStyleVariants & {
  href: string;
  className?: string;
  title?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
};

const Link = ({ children, href, className, color = 'main', onClick, size = 'normal', title }: LinkProps) => (
  <RouterLink className={css(link({ color, size }), className)} onClick={onClick} title={title} href={href}>
    {children}
  </RouterLink>
);

export default Link;
