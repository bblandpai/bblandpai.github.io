'use client';

import { FC, useEffect } from 'react';

interface FacebookSDKProps {
  appId: string;
}

export const FacebookSDKInitializer: FC<FacebookSDKProps> = ({ appId }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v19.0',
      });
      window.FB.AppEvents.logPageView();
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0] as HTMLScriptElement;
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return null;
};