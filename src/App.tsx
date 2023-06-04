import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import CreateTask from './pages/CerateTask';
import Tasks from './pages/Tasks';
import FollowTask from './pages/FollowTask';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/my-creates">
            <CreateTask />
          </Route>
          <Route exact path="/tasks">
            <Tasks />
          </Route>
          <Route path="/my-follows">
            <FollowTask />
          </Route>
          <Route exact path="/">
            <Redirect to="/my-creates" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/my-creates">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>我创建的</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tasks">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>任务广场</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/my-follows">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>我跟随的</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
