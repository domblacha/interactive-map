import { Grid, GridProps, Box, BoxProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export function Container({
  children,
  ...rest
}: PropsWithChildren<
  Omit<GridProps, 'container' | 'item' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
>) {
  return (
    <Grid container {...rest}>
      {children}
    </Grid>
  );
}

export function Row({
  children,
  ...rest
}: PropsWithChildren<
  Omit<GridProps, 'container' | 'item' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
>) {
  return (
    <Grid container item {...rest}>
      {children}
    </Grid>
  );
}

export function Col({
  children,
  ...rest
}: PropsWithChildren<BoxProps & Omit<GridProps, 'container' | 'item'>>) {
  return (
    <Box component={Grid} item {...rest}>
      {children}
    </Box>
  );
}
