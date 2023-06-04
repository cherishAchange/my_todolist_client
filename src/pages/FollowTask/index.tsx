import { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from '@ionic/react';

import './index.css';

interface TaskItem {
  userInfoId: number;
  followUsers: [];
  describe: string;
  title: string;
  CreatedAt: string;
  UpdatedAt: string;
  ID: number;
}

const Tab2: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);

  const login = () => {
    return fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({ "loginUsername": "test_user_3", "loginPassword": "test_password" }),
    })
      .then(async (res) => {
        return await res.json();
      });
  };

  const getTaskList = () => {
    fetch('/api/query/getFollowed', { method: 'post' })
      .then(async (res) => {
        return await res.json();
      })
      .then(data => {
        console.log('data', data.data);
        setTaskList(data.data);
      }).catch(e => {
        console.log('请求出错', e);
      });
  };

  useEffect(() => {
    const init = async () => {
      await login();
      getTaskList();
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>我跟随的</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {
            taskList.map(task => (
              <IonItem key={task.ID}>
                <IonCard color="warning" mode='md'>
                  <IonCardHeader>
                    <IonCardTitle>{task.title}</IonCardTitle>
                    <IonCardSubtitle>{task.CreatedAt}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>{task.describe}</IonCardContent>

                  <IonButton fill="clear" color="danger">unFollow</IonButton>
                </IonCard>
              </IonItem>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
