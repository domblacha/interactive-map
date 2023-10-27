import { LinkProps, Link as MuiLink } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';

import React, { PropsWithChildren } from 'react';

const InternalLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? '#'}>
      {children}
    </MuiLink>
  );
};

export default InternalLink;
