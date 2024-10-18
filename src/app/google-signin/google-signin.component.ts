import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth.service'; // Import the AuthService

declare var gapi: any;

@Component({
  selector: 'app-google-signin',
  standalone: true,
  template: `
    <div class="signin-container">
      <div class="signin-card">
        <h2>Welcome Back!</h2>
        <img src="logo.png" alt="BIT Logo" class="logo" />
        <h3>BANNARI AMMAN INSTITUTE OF TECHNOLOGY</h3>
        <p class="tagline">Stay Ahead</p>
        <h4>BIT Project Registration Portal</h4>
        <hr class="divider" />
        <button (click)="handleAuthClick()" class="g-signin-button">Google Sign In</button>
        <p class="signin-note">Sign in with your BIT account</p>
      </div>
    </div>
  `,
  styles: [`
    .signin-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #add8e6;
    }
    
    .signin-card {
      background-color: #ffffff;
      padding: 40px;
      border-radius: 10px;
      text-align: center;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      color: black;
      margin-bottom: 20px;
    }
    
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    
    h3 {
      color: black;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .tagline {
      color: black;
      margin-bottom: 20px;
    }
    
    h4 {
      color: black;
      margin-bottom: 10px;
    }
    
    .divider {
      width: 60%;
      margin: 20px auto;
      border: 0;
      border-top: 1px solid #b0bec5;
    }
    
    .g-signin-button {
      background-color: lightgray;
      color: black;
      padding: 12px 20px;
      border-radius: 5px;
      border: solid 2px black;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
      max-width: 280px;
      margin: 20px auto 10px;
    }

    .g-signin-button:hover{
      background-color: #add8e6;
      transition: ease-in 0.3s;
    }
    
    .signin-note {
      color: black;
      font-size: 14px;
    }
    
  `]
})
export class GoogleSigninComponent implements OnInit {

  clientId: string = '9132803845-lfhammfdo0tt46l8dgvusjtk2modck3p.apps.googleusercontent.com'; // replace with your client ID

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService // Inject the AuthService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('gapi-script').then(({ loadGapiInsideDOM }) => {
        loadGapiInsideDOM().then(() => {
          gapi.load('auth2', () => {
            gapi.auth2.init({
              client_id: this.clientId
            }).then(() => {
              console.log('Google Auth initialized successfully');
            }).catch((error: any) => {
              console.error('Error initializing Google Auth:', error);
            });
          });
        });
      }).catch((error: any) => {
        console.error('Error loading gapi-script:', error);
      });
    }
  }

  handleAuthClick() {
    if (isPlatformBrowser(this.platformId)) {
      const auth2 = gapi.auth2.getAuthInstance();
      if (auth2) {
        auth2.signIn().then((googleUser: any) => {
          const profile = googleUser.getBasicProfile();
          const email = profile.getEmail();
          const name = profile.getName(); // Get the user's name
          const domain = email.split('@')[1];

          if (domain === 'bitsathy.ac.in') {
            this.authService.setUserName(name); // Store the user's name in the AuthService
            this.router.navigateByUrl('/home').then(navigationSuccess => {
              if (navigationSuccess) {
                console.log('Navigation to /home was successful!');
              } else {
                console.error('Navigation to /home failed!');
              }
            });
          } else {
            alert('You must sign in with a bitsathy.ac.in email.');
          }
        }).catch((error: any) => {
          console.error('Error during sign-in:', error);
        });
      } else {
        console.error('Google Auth instance is not available');
      }
    }
  }
}
