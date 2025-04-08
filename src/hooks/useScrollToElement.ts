import { safeWindow } from '@/utils';
import { useEffect } from 'react';

export const useScrollToElement = () => {
  const hash = safeWindow?.location?.hash;

  useEffect(() => {
    if (!hash) {
      return;
    }

    const [, anchor] = hash.split('#');

    if (!anchor) {
      return;
    }

    const element = document.getElementById(anchor);

    if (!element) {
      return;
    }

    element.scrollIntoView();
  }, [hash]);
};
