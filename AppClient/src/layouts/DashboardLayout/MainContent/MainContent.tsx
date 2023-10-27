import { PropsWithChildren } from 'react';

import Toolbar from '@mui/material/Toolbar';

import Styled from './MainContent.styled';

export default function MainContent({ children }: PropsWithChildren) {
  return (
    <Styled.ContentBox component="main">
      <Toolbar />
      <Styled.Container>{children}</Styled.Container>
    </Styled.ContentBox>
  );
}
