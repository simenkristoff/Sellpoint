import React, { useEffect } from 'react';
import { Footer } from '@/components/Footer';

/**
 * Footer Container. Handles logic for the footer bar.
 * Stretches the main-container dom to full size in order to justify the
 * footer to the very bottom of the page.
 */
export const FooterContainer = () => {
  useEffect(() => {
    let observer: MutationObserver | null = null;
    const height = document.getElementsByClassName('site-footer')[0].clientHeight;
    const divElement = (document.getElementsByClassName('main-container') as HTMLCollectionOf<HTMLElement>)[0];
    if (divElement && height) {
      justifyContentWrapper(divElement, height);
    } else {
      observer = new MutationObserver(() => {
        const height = document.getElementsByClassName('site-footer')[0].clientHeight;
        const divElement = (document.getElementsByClassName('main-container') as HTMLCollectionOf<HTMLElement>)[0];
        if (divElement && height) {
          (observer as MutationObserver).disconnect();
          justifyContentWrapper(divElement, height);
        }
      });
      observer.observe(document, { subtree: true, childList: true });
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const justifyContentWrapper = (div: HTMLElement, height: number) => {
    div.style.minHeight = `calc(100% - ${height}px )`;
  };

  const stateToProps = {};

  const dispatchToProps = {};

  return <Footer {...stateToProps} {...dispatchToProps} />;
};
