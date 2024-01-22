import { FC } from 'react';
import ReactDOM from 'react-dom/client';
import {
  WebAppProvider,
} from '@vkruglikov/react-telegram-web-app';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';

import './index.css';

const MyApp: FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
     <DatePicker />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const App = () => {
  return (
    <div className='min-h-screen min-w-screen'>
    <WebAppProvider>
      <MyApp />
    </WebAppProvider>
    </div>
  );
};

root.render(<App />);