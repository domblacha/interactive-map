import { PropsWithChildren } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { LinkProps, Link as MuiLink } from '@mui/material';

const InternalLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? '#'}>
      {children}
    </MuiLink>
  );
};

export default InternalLink;
