import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'externalregistration',
  standalone: true,
  template: `
  <div class="body">
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
      <h2>External Project Registration</h2>
      <form #registrationForm="ngForm" (ngSubmit)="onSubmit(registrationForm)">
        
        <!-- Team Members Count -->
        <div class="form-group">
          <label for="teamMembersCount">Team Members Count:</label>
          <input type="number" id="teamMembersCount" [(ngModel)]="teamMembersCount" name="teamMembersCount" min="1" required (change)="updateMemberDetails()">
        </div>

        <!-- Team Member Details -->
        <div *ngFor="let member of members; let i = index" class="member-details">
          <h3>Member {{ i + 1 }}</h3>
          
          <!-- Name -->
          <div class="form-group">
            <label for="name{{ i }}">Name:</label>
            <input type="text" id="name{{ i }}" [(ngModel)]="member.name" name="name{{ i }}" pattern="^[A-Za-z ]+$" required #nameInput="ngModel">
            <div *ngIf="nameInput.invalid && nameInput.touched" class="validation-error">
              Name must contain only alphabets.
            </div>
          </div>
          
          <!-- Roll Number -->
          <div class="form-group">
            <label for="rollNo{{ i }}">Roll Number:</label>
            <input type="text" id="rollNo{{ i }}" [(ngModel)]="member.rollNo" name="rollNo{{ i }}" pattern="^[0-9]{7}[A-Za-z]{2}[0-9]{3}$" maxlength="12" required #rollNoInput="ngModel">
            <div *ngIf="rollNoInput.invalid && rollNoInput.touched" class="validation-error">
              Roll number must be alphanumeric (7 numbers, 2 letters, and 3 numbers).
            </div>
          </div>

          <!-- Department Dropdown -->
          <div class="form-group">
            <label for="department{{ i }}">Department:</label>
            <select id="department{{ i }}" [(ngModel)]="member.department" name="department{{ i }}" required #departmentInput="ngModel">
              <option value="" disabled>Select a department</option>
              <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
            </select>
            <div *ngIf="departmentInput.invalid && departmentInput.touched" class="validation-error">
              Please select a department.
            </div>
          </div>
        </div>

        <!-- Project Title -->
        <div class="form-group">
          <label for="title">Project Title:</label>
          <input type="text" id="title" [(ngModel)]="selectedTitle" name="title" required #titleInput="ngModel">
          <div *ngIf="titleInput.invalid && titleInput.touched" class="validation-error">
            Project Title is required.
          </div>
        </div>

        <!-- Faculty ID -->
        <div class="form-group">
          <label for="facultyId">Faculty ID:</label>
          <input type="text" id="facultyId" [(ngModel)]="facultyId" name="facultyId" pattern="^[A-Za-z]{2}[0-9]{5}$" maxlength="7" required #facultyIdInput="ngModel">
          <div *ngIf="facultyIdInput.invalid && facultyIdInput.touched" class="validation-error">
            Faculty ID must contain 2 letters followed by 5 numbers (7 characters).
          </div>
        </div>

        <!-- Faculty Name -->
        <div class="form-group">
          <label for="facultyName">Faculty Name:</label>
          <input type="text" id="facultyName" [(ngModel)]="facultyName" name="facultyName" pattern="^[A-Za-z ]+$" required #facultyNameInput="ngModel">
          <div *ngIf="facultyNameInput.invalid && facultyNameInput.touched" class="validation-error">
            Faculty Name must contain only alphabets.
          </div>
        </div>

        <!-- Project Cluster Dropdown -->
        <div class="form-group">
          <label for="projectCluster">Project Cluster:</label>
          <select id="projectCluster" [(ngModel)]="projectCluster" name="projectCluster" required #clusterInput="ngModel">
            <option value="" disabled>Select a cluster</option>
            <option *ngFor="let cluster of clusters" [value]="cluster">{{ cluster }}</option>
          </select>
          <div *ngIf="clusterInput.invalid && clusterInput.touched" class="validation-error">
            Please select a project cluster.
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button" [disabled]="registrationForm.invalid">Register</button>
      </form>

      <!-- Validation Alert -->
      <div *ngIf="formSubmitted && registrationForm.invalid" class="alert-message">
        Please fill out all fields correctly before submitting.
      </div>
    </div>
  </div>
  `,
  styles: [`
    .body {
      background: lightblue;
      font-family: 'Arial', sans-serif; /* Set a generic font-family for better compatibility */
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
      color: black; /* Change color for visibility on white background */
      cursor: pointer;
      font-size: 24px;
      transition: transform 0.3s ease, color 0.3s ease;
    }
  
    .icon-button:hover {
      color: #3498db; /* Change hover color for visibility */
      transform: scale(1.1);
    }
  
    .registration-container {
      max-width: 800px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 20px;
      min-height:100vh;
      background: linear-gradient(145deg, #ffffff, #f0f0f0);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
  `],
  
  imports: [CommonModule, FormsModule]
})
export class ExternalRegistrationComponent implements OnInit {
  teamMembersCount: number = 1;
  members: { name: string; rollNo: string; department: string }[] = [{ name: '', rollNo: '', department: '' }];
  selectedTitle: string = '';
  facultyId: string = '';
  facultyName: string = '';
  projectCluster: string = '';

  departments: string[] = ['CSE', 'Mechanical', 'EEE', 'ECE', 'Civil', 'IT'];
  clusters: string[] = ['CSE Cluster', 'Mechanical Cluster', 'ECE Cluster', 'Civil Cluster'];

  formSubmitted: boolean = false;

  ngOnInit() {
    this.updateMemberDetails();
  }

  updateMemberDetails() {
    this.members = Array.from({ length: this.teamMembersCount }, () => ({ name: '', rollNo: '', department: '' }));
  }

  onSubmit(registrationForm: NgForm) {
    this.formSubmitted = true;

    // If form is valid, process submission
    if (registrationForm.valid) {
      console.log({
        teamMembersCount: this.teamMembersCount,
        members: this.members,
        selectedTitle: this.selectedTitle,
        facultyId: this.facultyId,
        facultyName: this.facultyName,
        projectCluster: this.projectCluster
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
