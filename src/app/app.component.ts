import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var cordova: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent
{

  WifiConfiguration = {
    BSSID: '80:35:c1:1a:5f:8c',
    SSID: 'Redmi',
    allowedAuthAlgorithms: {
    LEAP: true,
    OPEN: true,
    SHARED: true
  },
  allowedGroupCiphers: {
    CCMP: true,
    TKIP: true,
    WEP104: true,
    WEP40: true
  },
  allowedKeyManagement: {
    IEEE8021X: true,
    NONE: true,
    WPA_EAP: true,
    WPA_PSK: true
  },
  allowedPairwiseCiphers: {
    CCMP: true,
    NONE: true,
    TKIP: true
  },
  allowedProtocols: {
    RSN: true,
    WPA: true
  },
  hiddenSSID: false,
  networkId: 0,
  preSharedKey: 'psk',
  status: 'ENABLED',
  wepKeys: [
    null,
    null,
    null,
    null
  ],
  wepTxKeyIndex: 0
 }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() =>
    {

      cordova.plugins.WifiManager.onwifistatechanged = function (data) {
        console.log(data.previousWifiState, '->', data.wifiState)
      }


    cordova.plugins.WifiManager.setWifiEnabled(true, function (err, success) {
      console.log(err, success)
    })

     cordova.plugins.WifiManager.getConnectionInfo(true, function (err, success) {
      console.log(err, success)
     })

      cordova.plugins.WifiManager.startScan(true, function (err, success)
      {
        console.log("Comensando scan");
         console.log(err, success)

        cordova.plugins.WifiManager.getScanResults(true, function (err, success)
        {
          console.log("Los resultados del scan son");
                console.log(err, success)
                  })
       })


      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
