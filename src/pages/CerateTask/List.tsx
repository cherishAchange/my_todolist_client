import { useEffect, useState } from 'react';
import {
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from '@ionic/react';

interface TaskItem {
  userInfoId: number;
  followUsers: [];
  describe: string;
  title: string;
  CreatedAt: string;
  UpdatedAt: string;
  ID: number;
}

const List = () => {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);

  const getTaskList = () => {
    fetch('/api/query/getOwnTasks', { method: 'post' })
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
    getTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonList>
      {
        taskList.map(task => (
          <IonItem key={task.ID}>
            <IonCard color="success" mode='md'>
              <IonCardHeader>
                <IonCardTitle>{task.title}</IonCardTitle>
                <IonCardSubtitle>{task.CreatedAt}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>{task.describe}</IonCardContent>

              <IonButton fill="clear" color="light">Publish</IonButton>
            </IonCard>
          </IonItem>
        ))
      }
    </IonList>
  );
};

export default List;
