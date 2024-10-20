import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="header-logo">
        <img src="logo.png" alt="College Logo" />
      </div>
      <div class="header-info">
        <div class="header-title">OFFICE ACADEMICS</div>
        <div class="header-college-name">Bannari Amman Institute of Technology</div>
        <div class="header-address">Sathyamangalam, Erode - 638 401</div>
        <div class="header-contact">
          <span>T: 04295 226584</span>
          <span>M: officeacademics&#64;bitsathy.ac.in</span>
        </div>
      </div>
    </header>

    <div class="user-selection-container">
      <div class="title-container">
        <h1>Project Title Registration Portal</h1>
        <h2>Select User Type</h2>
      </div>
      <div class="grid-container">
        <div class="option-box" (click)="navigateTo('admin')">
          <span>Admin</span>
        </div>
        <div class="option-box" (click)="navigateTo('faculty')">
          <span>Faculty</span>
        </div>
        <div class="option-box" (click)="navigateTo('student')">
          <span>Student</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* General Styling */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    
    /* Header Styling */
    .header {
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #00509e, #003366);
      padding: 25px;
      border-radius: 15px;
      margin: 20px auto;
      max-width: 95%;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      color: #fff;
    }
    
    .header-logo img {
      height: 100px;
      margin-right: 20px;
      animation: fadeIn 0.8s ease-in;
    }
    
    .header-info {
      flex-grow: 1;
      text-align: center;
    }
    
    .header-title {
      font-size: 28px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 5px;
      color: #ffdc5d;
    }
    
    .header-college-name {
      font-size: 22px;
      font-weight: 600;
      margin: 5px 0;
    }
    
    .header-address, .header-contact {
      font-size: 16px;
      margin: 2px 0;
    }
    
    /* User Selection Container */
    .user-selection-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      padding: 40px 20px;
      border-radius: 20px;
      margin: 20px auto;
      max-width: 90%;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      animation: slideUp 0.8s ease-in-out;
    }

    .title-container h1 {
      font-size: 30px;
      color: #00509e;
      margin-bottom: 10px;
      text-align: center;
      font-weight: bold;
    }

    .title-container h2 {
      font-size: 22px;
      color: #555;
      margin-bottom: 40px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      text-align: center;
    }

    /* Grid Styling */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 1000px;
    }

    .option-box {
      height: 180px;
      background: linear-gradient(135deg, #00aaff, #0077b6);
      color: #fff;
      text-align: center;
      border-radius: 20px;
      cursor: pointer;
      font-size: 22px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .option-box:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
    }

    .option-box:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.15);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .option-box:hover:before {
      opacity: 1;
    }

    .option-box span {
      z-index: 1;
    }

    /* Animations */
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes slideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class UserSelectionComponent {
  constructor(private router: Router) {}

  navigateTo(userType: string) {
    this.router.navigate([`/${userType}`]);
  }
}
