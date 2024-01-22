import { DispatchWithoutAction, FC, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  useThemeParams,
  WebAppProvider,
} from '@vkruglikov/react-telegram-web-app';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

import './index.css';

import useBetaVersion from './components/useBetaVersion';

const DemoApp: FC<{
  onChangeTransition: DispatchWithoutAction;
}> = ({ onChangeTransition }) => {
  const [colorScheme, themeParams] = useThemeParams();
  const [isBetaVersion, ] = useBetaVersion();
  const [, setActiveBtn] = useState(true);

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
          {isBetaVersion && (
            <div className="betaVersion">
              <h3>WARNING: BETA VERSION</h3>
              <button onClick={() => setActiveBtn(state => !state)}>
                change button
              </button>
              <button onClick={onChangeTransition}>change </button>
            </div>
          )}
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