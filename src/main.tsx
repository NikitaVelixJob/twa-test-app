import { DispatchWithoutAction, FC, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  useThemeParams,
  WebAppProvider,
} from '@vkruglikov/react-telegram-web-app';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

import './index.css';
import HapticFeedbackDemo from './components/HapticFeedbackDemo';
import BackButtonDemo from './components/BackButton';
import { useExternalScripts } from './App';

const DemoApp: FC<{
  onChangeTransition: DispatchWithoutAction;
}> = () => {
  const [colorScheme, themeParams] = useThemeParams();
  useExternalScripts("https://telegram.org/js/telegram-web-app.js");
  return (
    <div>
      <ConfigProvider
        theme={
          themeParams.text_color
            ? {
                algorithm:
                  colorScheme === 'dark'
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                  colorText: themeParams.text_color,
                  colorPrimary: themeParams.button_color,
                  colorBgBase: themeParams.bg_color,
                },
              }
            : undefined
        }
      >
        <div className="contentWrapper">
          <HapticFeedbackDemo />
          <BackButtonDemo />
        </div>
      </ConfigProvider>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const App = () => {
  const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
      <DemoApp
        onChangeTransition={() => setSmoothButtonsTransition(state => !state)}
      />
    </WebAppProvider>
  );
};

root.render(<App />);