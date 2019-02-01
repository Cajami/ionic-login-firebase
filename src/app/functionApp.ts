import { AlertController } from '@ionic/angular';
export const funciones = {
    getDominioUsuario(): string {
        return '@familiahi.com';
    },
    async showAlertOkBlank(alertCtrl: AlertController, header: string, message: string) {
        const alert = await alertCtrl.create({
            header: header,
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }
}