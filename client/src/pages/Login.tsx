import { IonContent, IonPage, IonText, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import React from "react";
import "./Page.css";
import { Controller, useForm } from 'react-hook-form';


function Login() {

  const { control, handleSubmit } = useForm({
    mode: "onChange"
  });

  const login = (data) => {
    async function bearerToken(data) {
      const response = await fetch(
        'http://192.168.254.67:20000/bearer-token',
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }
      );
      return response.json();
    }
    bearerToken(data).then(res => {
      console.log(res)
      if (res['success']) {
        localStorage.setItem('token', res['message']);
      }

    });
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText color="muted">
          <h2>Please Login</h2>
        </IonText>
        <form onSubmit={handleSubmit(login)}>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <Controller
            control={control}
            render={({ onChange, value }) => {
              return (
                <IonInput
                  onInput={e => onChange(e.currentTarget.value)}
                  value={value}
                  type="email"
                />
              );
            }}
            name="email"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" }
            }}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Password</IonLabel>
          <Controller
            control={control}
            render={({ onChange, value }) => {
              return (
                <IonInput
                  onInput={e => onChange(e.currentTarget.value)}
                  value={value}
                  type="password"
                />
              );
            }}
            name="password"
            rules={{
              required: true,
              minLength: { value: 4, message: "Must be 4 chars long" }
            }}
          />
        </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Login
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default Login;
