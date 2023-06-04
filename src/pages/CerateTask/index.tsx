import { useCallback, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  useIonRouter,
} from '@ionic/react';
import { addCircle } from 'ionicons/icons';

import List from './List';
import CreateForm from './CreateForm';
import './index.css';

const Tab2: React.FC = () => {
  const router = useIonRouter();
  

  const login = () => {
    return fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({ "loginUsername": "test_user_3", "loginPassword": "test_password" }),
    })
      .then(async (res) => {
        return await res.json();
      });
  };

  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createHandle = useCallback(() => {
    router.push('/my-creates/create');
  }, [router]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>我创建的</IonTitle>
          <IonIcon
            onClick={createHandle}
            color="primary"
            icon={addCircle}
            size='large'
            slot='end'
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Switch>
          <Route exact path="/my-creates/list">
            <List />
          </Route>
          <Route exact path="/my-creates/create">
            <CreateForm />
          </Route>
          <Route exact path="/my-creates">
            <Redirect to="/my-creates/list" />
          </Route>
        </Switch>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
