import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

import InternalLink from '@/components/InternalLink/InternalLink';

export const EmailIcon = styled(MarkEmailReadIcon)`
  font-size: 150px;
  margin-bottom: 1rem;
`;

export const CenteredContent = styled(Box)`
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const MainTitle = styled('h1')`
  margin: 1rem 0;
`;

export const AbsoluteLink = styled(InternalLink)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const ResendButton = styled(Button)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
  padding: '8px',
  margin: '16px',
}));
