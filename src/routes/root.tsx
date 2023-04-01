import { Outlet } from 'react-router-dom';
import React from 'react';
import NavPanel from '../components/nav-panel/NavPanel';
import Modal from '../components/modal/Modal';
import { useCustomer, useModal } from '../store';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const RootPage: React.FC = () => {
  const setId = useCustomer(state => state.setId);
  const modal = useModal(state => state.modal);

  let tg = window.Telegram.WebApp;

  React.useEffect(() => {
    const tg_id = tg.initDataUnsafe.user?.id;
    if (tg_id) {
      setId(tg_id.toString());
    }

    tg.ready();
    tg.expand();
  }, []);

  return (
    <>
      <Outlet />
      <NavPanel />
      <TawkMessengerReact propertyId="6428292f31ebfa0fe7f5e8bf" widgetId="1gsue1p9s" />

      {modal && <Modal />}
    </>
  );
};

export default RootPage;
