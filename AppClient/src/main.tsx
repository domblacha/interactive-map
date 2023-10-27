import ReactDOM from 'react-dom/client';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import App from './App.tsx';
import theme from './config/styles';
import store, { history } from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);
