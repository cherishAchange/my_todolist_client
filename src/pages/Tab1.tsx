import { useEffect, useState } from 'react';
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
} from '@ionic/react';
import './Tab1.css';

interface Item {
  url: string;
  prompt: string;
  nickname: string;
  fileName: string;
}

interface ItemResponse {
  attachment: { url: string; file_name: string; };
  prompt: string;
  author: { nickname: string; };
}

const Tab1: React.FC = () => {

  const [last, setLast] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const keywords = 'style';

  const generateItems = () => {
    fetch(`https://api.promptart.cc/api/prompt/search?keywords=${keywords}&limit=8&last=${last}`)
      .then(async (res) => {
        return await res.json();
      })
      .then(data => {
        const { last_prompt, prompts } = data.data;
        const format = prompts.map((item : ItemResponse) => ({
          url: item.attachment.url,
          prompt: item.prompt,
          nickname: item.author.nickname,
          fileName: item.attachment.file_name,
        }));
        setLast(last_prompt);
        setItems(items.concat(format));
      }).catch(e => {
        console.log('请求出错', e);
      });
  };

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>照片墙</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {
            items.map((card, index) => (
              <IonItem key={index}>
                <IonCard>
                  <img alt={card.fileName} src={card.url} />
                  <IonCardHeader>
                    <IonCardTitle>{card.nickname}</IonCardTitle>
                    <IonCardSubtitle>{card.nickname}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>
                    {card.prompt}
                  </IonCardContent>
                </IonCard>
              </IonItem>
            ))
          }
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            generateItems();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
