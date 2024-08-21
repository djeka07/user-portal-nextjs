import { Icon, Typography } from '@djeka07/ui';
import { getTranslation } from '~/app/i18n/server';
import logoutAction from '~/auth/models/actions/logout';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { Link } from '../links';
import {
  hideLiInMobile,
  icon,
  item,
  li,
  list,
  logoutButton,
  navigation,
  root,
  themeLi,
  truncated,
} from './navigation.css';
import ThemeContainer from '../themes/theme.container';

type NavigationProps = {
  language: string;
  currentUser: UserResponse;
  isAdmin: boolean;
};

const Navigation = async (props: NavigationProps) => {
  const { t, language } = await getTranslation(props.language, 'common');
  return (
    <header className={root}>
      <nav className={navigation}>
        <ul className={list}>
          <li className={li}>
            <Link title={t('common:navigation:home')} className={item} href={`/${language}`}>
              <Icon name="Home" className={icon} />
              <Typography className={truncated} color="link" size="xsmall">
                {t('common:navigation:home')}
              </Typography>
            </Link>
          </li>
          <li className={li}>
            <Link title={t('common:navigation:users')} className={item} href={`/${language}/users`}>
              <Icon name="Users" className={icon} />
              <Typography className={truncated} color="link" size="xsmall">
                {t('common:navigation:users')}
              </Typography>
            </Link>
          </li>
          <li className={li}>
            <Link title={t('common:navigation:messages')} className={item} href={`/${language}/messages`}>
              <Icon name="Message" className={icon} />
              <Typography className={truncated} color="link" size="xsmall">
                {t('common:navigation:messages')}
              </Typography>
            </Link>
          </li>
          <li className={li}>
            <Link
              title={t('common:navigation:profile')}
              className={item}
              href={`${language}/users/${props.currentUser?.id}`}
            >
              <Icon name="User" className={icon} />
              <Typography className={truncated} color="link" size="xsmall">
                {t('common:navigation:profile')}
              </Typography>
            </Link>
          </li>
          {props.isAdmin && (
            <li className={li}>
              <Link title={t('common:navigation:apps')} className={item} href={`/${language}/applications`}>
                <Icon name="Server" className={icon} />
                <Typography className={truncated} color="link" size="xsmall">
                  {t('common:navigation:apps')}
                </Typography>
              </Link>
            </li>
          )}
          {props.isAdmin && (
            <li className={hideLiInMobile}>
              <Link title={t('common:navigation:settings')} className={item} href={`/${language}/settings`}>
                <Icon name="Settings" className={icon} />
                <Typography className={truncated} color="link" size="xsmall">
                  {t('common:navigation:settings')}
                </Typography>
              </Link>
            </li>
          )}
          <li className={li}>
            <form className={item} action={logoutAction} title={t('common:navigation:logout')}>
              <button className={logoutButton} name="logout" type="submit">
                <Icon name="Logout" className={icon} />
                <Typography className={truncated} color="link" size="xsmall">
                  {t('common:navigation:logout')}
                </Typography>
              </button>
            </form>
          </li>
          <li className={themeLi}>
            <ThemeContainer size="normal" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
