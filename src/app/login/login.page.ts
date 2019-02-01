import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  password: string = "";

  constructor(private auth: AngularFireAuth,
    private router: Router) {

  }

  ngOnInit() {
  }

  async login() {
    try {
      const res = await this.auth.auth.signInWithEmailAndPassword(this.usuario + '@familiahi.com', this.password);
      this.router.navigate(['/main']);
      console.log(res);
    } catch (error) {
      console.log('si errores');

      console.log(error);
    }
  }

  irRegistrar() {
    this.router.navigate(['/register']);
  }



}
