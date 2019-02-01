import { UserInterface } from './../models/UserInterface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { funciones } from './../functionApp';

import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  displayName: string = "";
  usuario: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private afs: AngularFirestore) { }

  ngOnInit() {
  }

  async registrarUsuario() {
    try {
      if (!this.displayName || !this.usuario || !this.password || !this.cpassword) {
        return funciones.showAlertOkBlank(this.alertController, "Error!", "Password no coinciden");
      }

      if (this.password != this.cpassword) {
        return funciones.showAlertOkBlank(this.alertController, "Error!", "Password no coinciden");
      }

      return this.afAuth.auth.createUserWithEmailAndPassword(this.usuario + funciones.getDominioUsuario(), this.password)
        .then(credential => {
          console.log('se creo el usuario');
          const userRef: AngularFirestoreDocument<UserInterface> = this.afs.doc(`users/${credential.user.uid}`);

          const data: UserInterface = {
            uid: credential.user.uid,
            email: credential.user.email,
            displayName: this.displayName
          };
          userRef.set(data, { merge: true });

          //this.router.navigate(['/login'])

          credential.user.updateProfile({ displayName: this.displayName, photoURL: '' });

          console.log('se guardó');


        })
        .catch(error => {
          // this.handleError(error)
        });
    } catch (error) {

    }


  }


}
