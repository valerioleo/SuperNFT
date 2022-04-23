/* eslint-disable @typescript-eslint/no-explicit-any */
export const trackEvent = (event, data = {}) => {
  try {
    if(!(window as any).dataLayer) return;
    (window as any).dataLayer.push({...data, event});
  }
  catch(err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
