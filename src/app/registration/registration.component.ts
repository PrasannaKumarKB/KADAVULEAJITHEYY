import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  isInternalProject: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      projectType: ['', Validators.required], 
      teamMemberCount: ['', Validators.required], 
      members: this.fb.array([]), 
      title: ['', Validators.required], 
      facultyId: ['', Validators.required], 
      facultyName: ['', Validators.required]
    });
  }

  get members(): FormArray {
    return this.registrationForm.get('members') as FormArray;
  }

  // Method to handle team member count and dynamically create inputs
  onTeamMemberCountChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const count = parseInt(inputElement.value, 10);
    
    if (!isNaN(count)) {
      this.members.clear();
      for (let i = 0; i < count; i++) {
        this.members.push(
          this.fb.group({
            name: ['', Validators.required],
            rollNo: ['', Validators.required],
            department: ['', Validators.required]
          })
        );
      }
    }
  }

  // Method to toggle project type and show/hide internal project fields
  onProjectTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.isInternalProject = selectElement.value === 'Internal';
  }

  // Submit method to handle form submission
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      alert('Registration successful!');
    } else {
      alert('Please fill in all fields correctly!');
    }
  }
}
