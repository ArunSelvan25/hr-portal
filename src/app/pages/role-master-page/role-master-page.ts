import { Component, inject, OnInit } from '@angular/core';
import { MasterService, DesignationInterface } from '../../services/master/master-service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-role-master-page',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, NgClass],
  templateUrl: './role-master-page.html',
  styleUrl: './role-master-page.css'
})
export class RoleMasterPage implements OnInit {

  ngOnInit(): void {
    this.masterService.buildDesignationForm();
  }

  masterService = inject(MasterService);
  animatePopup = false;
  isOpen = false;
  showSlideIn = false;

  openAddDesignation() {
    this.masterService.toggleShowDesignationPopup(true);
    setTimeout(() => (this.animatePopup = true), 10);
  }

  editDesignation(designation: DesignationInterface) {
    this.masterService.toggleShowDesignationPopup(true, designation);
  }

  onSubmit() {
    this.masterService.onSubmitDesignationForm();
  }

  openPopup() {
    this.isOpen = true;
    setTimeout(() => (this.showSlideIn = true), 60);
  }

  closePopup() {
    this.showSlideIn = false;
    setTimeout(() => (this.isOpen = false), 60);
  }
}
