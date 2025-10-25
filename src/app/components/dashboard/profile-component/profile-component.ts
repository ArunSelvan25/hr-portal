import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-component',
  imports: [],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent {
  user = {
    name: 'Arun Kumar',
    email: 'arun.kumar@company.com',
    role: 'HR Manager',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    avatar: 'https://i.pravatar.cc/150?img=32',
    joinDate: '12 Jan 2021',
    department: 'Human Resources'
  };
}
