import { useState, useEffect, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

export interface PickerFile {
  id: string;
  name: string;
  mimeType: string;
  url: string;
}

interface UseGooglePickerOptions {
  onSelect: (files: PickerFile[]) => void;
}

// Helper to load a script
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

export const useGooglePicker = ({ onSelect }: UseGooglePickerOptions) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [token, setToken] = useState<google.accounts.oauth2.TokenResponse | null>(null);

  useEffect(() => {
    const loadGapiAndGsi = async () => {
      try {
        await Promise.all([
          loadScript('https://apis.google.com/js/api.js'),
          loadScript('https://accounts.google.com/gsi/client'),
        ]);

        await new Promise<void>((resolve) => gapi.load('client:picker', resolve));
        await gapi.client.init({});
        
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Error loading Google scripts:', error);
      }
    };

    loadGapiAndGsi();
  }, []);

  const openPicker = useCallback(() => {
    if (!scriptsLoaded) {
      console.error('Google scripts not loaded yet.');
      return;
    }

    const showPicker = (accessToken: string) => {
      const picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.DOCS)
        .setOAuthToken(accessToken)
        .setDeveloperKey(API_KEY)
        .setCallback((data: google.picker.ResponseObject) => {
          if (data.action === google.picker.Action.PICKED && data.docs) {
            const files: PickerFile[] = data.docs.map((doc) => ({
              id: doc.id,
              name: doc.name ?? '',
              mimeType: doc.mimeType ?? '',
              url: doc.url ?? '',
            }));
            onSelect(files);
          }
        })
        .build();
      picker.setVisible(true);
    };

    if (token?.access_token) {
        showPicker(token.access_token);
    } else {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: (tokenResponse: google.accounts.oauth2.TokenResponse) => {
                if (tokenResponse.error) {
                    console.error('OAuth Error:', tokenResponse.error);
                    return;
                }
                setToken(tokenResponse);
                showPicker(tokenResponse.access_token);
            },
        });
        client.requestAccessToken();
    }

  }, [scriptsLoaded, onSelect, token]);

  return { openPicker };
};
