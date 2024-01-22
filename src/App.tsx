import './App.css'
import { WebAppProvider, MainButton, useShowPopup } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';

export async function useExternalScripts(url: string) {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    if (!head) throw new Error("No head element");

    script.setAttribute("src", url);
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, [url]);
};

export const Content = () => {
  const showPopup = useShowPopup();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  return <MainButton text="SHOW POPUP" onClick={handleClick} />;
};

function App() {
  useExternalScripts("https://telegram.org/js/telegram-web-app.js");

  return (
      <WebAppProvider
        options={{
          smoothButtonsTransition: true,
        }}
      >
        <Content />
      </WebAppProvider>
  )
}

export default App
