import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'internalregistration',
  standalone: true,
  template: `
    <div class="body">
      <div *ngIf="formError" class="error-notification">
        <p>{{ formError }}</p>
      </div>
      <nav class="navbar">
        <div class="navbar-left">
          <span>Welcome, {{ username }}</span>
        </div>
        <div class="navbar-right">
          <button class="icon-button" (click)="toggleTheme()" title="Toggle Dark Mode">🌙</button>
          <button class="icon-button" (click)="toggleNotifications()" title="View Notifications">🔔</button>
        </div>
      </nav>

      <div class="registration-container">
        <h2>Internal Project Registration</h2>
        <form #registrationForm="ngForm" (ngSubmit)="onSubmit(registrationForm)">
          <div class="form-group">
            <label for="teamMembersCount">Team Members Count:</label>
            <input type="number" id="teamMembersCount" [(ngModel)]="teamMembersCount" name="teamMembersCount" min="1" required (change)="updateMemberDetails()">
          </div>

          <div *ngFor="let member of members; let i = index" class="member-details">
            <h3>Team Member {{ i + 1 }}</h3>
            <div class="form-group">
              <label for="name{{ i }}">Name:</label>
              <input type="text" id="name{{ i }}" [(ngModel)]="member.name" name="name{{ i }}" pattern="^[a-zA-Z ]*$" required>
              <div *ngIf="registrationForm.submitted && !registrationForm.controls['name' + i]?.valid" class="validation-error">
                Name must contain only alphabets.
              </div>
            </div>
            <div class="form-group">
              <label for="rollNo{{ i }}">Roll Number:</label>
              <input type="text" id="rollNo{{ i }}" [(ngModel)]="member.rollNo" name="rollNo{{ i }}" pattern="^[0-9]{7}[A-Za-z]{2}[0-9]{3}$" maxlength="12" required>
              <div *ngIf="registrationForm.submitted && !registrationForm.controls['rollNo' + i]?.valid" class="validation-error">
                Roll number must be 12 characters long: 7 digits, 2 letters, 3 digits.
              </div>
            </div>
            <div class="form-group">
              <label for="department{{ i }}">Department:</label>
              <select id="department{{ i }}" [(ngModel)]="member.department" name="department{{ i }}" required>
                <option value="" disabled>Select a department</option>
                <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
              </select>
              <div *ngIf="registrationForm.submitted && !registrationForm.controls['department' + i]?.valid" class="validation-error">
                Please select a department.
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="title">Project Title:</label>
            <select id="title" [(ngModel)]="selectedTitle" name="title" required>
              <option value="" disabled>Select a title</option>
              <option *ngFor="let title of titles" [value]="title">{{ title }}</option>
            </select>
            <div *ngIf="registrationForm.submitted && !registrationForm.controls['title']?.valid" class="validation-error">
              Please select a project title.
            </div>
          </div>

          <div class="form-group">
            <label for="facultyId">Faculty ID:</label>
            <input type="text" id="facultyId" [(ngModel)]="facultyId" name="facultyId" pattern="^[A-Za-z]{2}[0-9]+$" maxlength="7" required>
            <div *ngIf="registrationForm.submitted && !registrationForm.controls['facultyId']?.valid" class="validation-error">
              Faculty ID must start with two letters followed by numbers.
            </div>
          </div>

          <div class="form-group">
            <label for="facultyName">Faculty Name:</label>
            <input type="text" id="facultyName" [(ngModel)]="facultyName" name="facultyName" pattern="^[a-zA-Z ]*$" required>
            <div *ngIf="registrationForm.submitted && !registrationForm.controls['facultyName']?.valid" class="validation-error">
              Faculty name must contain only alphabets.
            </div>
          </div>

          <button type="submit" [disabled]="!registrationForm.valid" class="submit-button">Register</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .body {
      background: linear-gradient(skyblue, pink);
      display:grid;
      justify-content:normal;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      padding: 15px 30px;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      color: black;
      border-radius: 10px;
      margin-bottom: 30px;
      margin-top:40px;
      margin-left:40px;
    }

    .navbar-left {
      font-size: 20px;
      font-weight: 600;
    }

    .navbar-right {
      display: flex;
      gap: 20px;
    }

    .icon-button {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 24px;
      transition: transform 0.3s ease, color 0.3s ease;
    }

    .icon-button:hover {
      color: #e0e0e0;
      transform: scale(1.1);
    }

    .registration-container {
      max-width: 800px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 20px;
      background: linear-gradient(145deg, #ffffff, #f0f0f0);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      font-family: 'timesnewroman';
    }

    h2 {
      text-align: center;
      font-size: 2em;
      color: #2c3e50;
      margin-bottom: 25px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #34495e;
    }

    input, select {
      width: 90%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 10px;
      font-size: 16px;
      background-color: #f9f9f9;
      transition: border-color 0.3s, background-color 0.3s;
    }

    input:focus, select:focus {
      border-color: #3498db;
      background-color: #fff;
    }

    .validation-error {
      color: red;
      font-size: 0.9em;
      margin-top: 5px;
    }

    .submit-button {
      width: 100%;
      padding: 15px;
      font-size: 18px;
      color: white;
      background-color: #3498db;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.3s;
    }

    .submit-button:disabled {
      background-color: #bdc3c7;
    }

    /* Error Notification */
    .error-notification {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      max-width: 600px;
      padding: 15px;
      background: linear-gradient(135deg, #e74c3c, #e67e22);
      color: white;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-radius: 8px;
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      animation: slideDown 0.5s ease-out, fadeOut 0.5s ease-in 4.5s forwards;
      opacity: 1;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-100%) translateX(-50%);
      }
      to {
        transform: translateY(0) translateX(-50%);
      }
    }

    @keyframes fadeOut {
      to {
        opacity: 0;
      }
    }
  `],
  imports: [CommonModule, FormsModule]
})
export class InternalRegistrationComponent implements OnInit {
  teamMembersCount: number = 1;
  members: { name: string; rollNo: string; department: string }[] = [{ name: '', rollNo: '', department: '' }];
  selectedTitle: string = '';
  facultyId: string = '';
  facultyName: string = '';
  formError: string = '';
  titles: string[] = ['Project A', 'Project B', 'Project C'];
  departments: string[] = ['CSE', 'ECE', 'EEE', 'IT', 'Mechanical'];

  ngOnInit() {
    this.updateMemberDetails();
  }

  updateMemberDetails() {
    this.members = Array.from({ length: this.teamMembersCount }, () => ({ name: '', rollNo: '', department: '' }));
  }

  onSubmit(registrationForm: NgForm) {
    if (!registrationForm.valid) {
      this.formError = "Please fill out all required fields correctly.";
    } else {
      this.formError = ''; // Clear error
      console.log({
        teamMembersCount: this.teamMembersCount,
        members: this.members,
        selectedTitle: this.selectedTitle,
        facultyId: this.facultyId,
        facultyName: this.facultyName
      });
      alert('Form submitted successfully!');
    }
  }
  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications; 
  }
  username: string = 'User'; // Placeholder for actual username
  showNotifications: boolean = false;
  notifications: string[] = ['Notification 1', 'Notification 2', 'Notification 3'];
}
