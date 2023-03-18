import React from 'react';
import { useNavigate } from 'react-router-dom';

const tg = window.Telegram.WebApp;

export function useTelegram() {
  const user = tg.initDataUnsafe?.user;
  const queryId = tg.initDataUnsafe?.query_id;

  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show();
  };

  const setBackButton = (path: string) => {
    const { tg } = useTelegram();
    const navigate = useNavigate();

    React.useEffect(() => {
      tg.BackButton.show();
      tg.onEvent('backButtonClicked', () => navigate(path));
      return () => {
        tg.offEvent('backButtonClicked', () => navigate(path));
        tg.BackButton.hide();
      };
    }, []);
  };

  return { tg, onClose, user, onToggleButton, queryId, setBackButton };
}
