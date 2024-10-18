import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-selection-container">
      <h2>Select User Type</h2>
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
    .user-selection-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
      color: #fff;
      font-family: 'Arial', sans-serif;
      padding: 20px;
    }

    h2 {
      font-size: 36px;
      margin-bottom: 40px;
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
      letter-spacing: 1px;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 800px;
      padding: 10px;
    }

    .option-box {
      height: 200px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      text-align: center;
      border-radius: 15px;
      cursor: pointer;
      font-size: 22px;
      font-weight: bold;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      transition: all 0.4s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .option-box:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-10px);
      border: 2px solid #fff;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }
  `]
})
export class UserSelectionComponent {

  constructor(private router: Router) {}

  navigateTo(userType: string) {
    switch (userType) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      case 'faculty':
        this.router.navigate(['/faculty']);
        break;
      case 'student':
        this.router.navigate(['/student']);
        break;
      default:
        console.log('Invalid user type');
    }
  }
}
