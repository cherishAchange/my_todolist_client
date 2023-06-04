import {
  IonList,
  IonItem,
  IonButton,
  useIonRouter,
  IonInput,
  IonTextarea,
} from '@ionic/react';
import { useForm, Controller } from "react-hook-form";

interface Task {
  title: string;
  describe: string;
}

const CreateForm = () => {
  const router = useIonRouter();
  const { handleSubmit, control, formState: { errors } } = useForm<Task>({
    defaultValues: {
      title: '',
      describe: '',
    },
  });

  const createTask = (data: Task) => {
    fetch('/api/task/create', {
      method: 'post',
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        await res.json();

        router.push('/my-creates/list');
      });
  };

  const errorHandle = (err: any) => {
    console.log('err', err);
  };

  return (
    <form>
      <IonList>
        <IonItem>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <IonInput
                {...field}
                onIonChange={field.onChange}
                onIonBlur={field.onBlur}
                label="标题"
                labelPlacement="floating"
                placeholder="输入任务标题"
              />
            )}
          />
        </IonItem>

        <IonItem>
          <Controller
            name="describe"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <IonTextarea
                {...field}
                label="描述"
                onIonChange={field.onChange}
                onIonBlur={field.onBlur}
                labelPlacement="floating"
                placeholder='输入任务描述'
                counter={true}
                maxlength={20}
                class="custom"
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
              />
            )}
          />
        </IonItem>

        <IonItem lines="none">
          <IonButton slot='end' onClick={handleSubmit(createTask, errorHandle)}>创建</IonButton>
        </IonItem>
      </IonList>
    </form>
  );
};

export default CreateForm;
