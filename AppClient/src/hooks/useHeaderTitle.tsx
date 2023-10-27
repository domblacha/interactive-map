import React from 'react';
import { useOutletContext } from 'react-router-dom';

type ContextType = {
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>;
};

const useHeaderTitle = (title: string) => {
  const { setHeaderTitle } = useOutletContext<ContextType>();
  React.useEffect(() => {
    setHeaderTitle(title);
  }, []);
};

export default useHeaderTitle;
