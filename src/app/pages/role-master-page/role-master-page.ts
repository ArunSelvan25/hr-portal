import { Component, HostListener, inject, OnInit } from '@angular/core';
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
  showDesignationDropdown = false;

  ngOnInit(): void {
    this.masterService.buildDesignationForm();
    this.masterService.buildTeamForm();
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

  onTeamSubmit() {
    this.masterService.onSubmitTeamForm();
    this.closePopup();
  }

  openPopup() {
    this.isOpen = true;
    setTimeout(() => (this.showSlideIn = true), 60);
  }

  closePopup() {
    this.showSlideIn = false;
    setTimeout(() => (this.isOpen = false), 60);
  }

  // ✅ Dropdown closing logic (must be on a method, not property)
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.designation-dropdown-container')) {
      this.showDesignationDropdown = false;
    }
  }

  // ✅ Dropdown toggle helpers
  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.showDesignationDropdown = !this.showDesignationDropdown;
  }

  toggleDesignation(designation: any) {
    const control = this.masterService.teamForm.get('designations');
    const selected = control?.value || [];
    const exists = selected.find((d: any) => d.id === designation.id);

    if (exists) {
      control?.setValue(selected.filter((d: any) => d.id !== designation.id));
    } else {
      control?.setValue([...selected, designation]);
    }

    control?.markAsDirty();
  }

  isSelected(designation: any): boolean {
    const selected = this.masterService.teamForm.get('designations')?.value || [];
    return selected.some((d: any) => d.id === designation.id);
  }

  removeDesignation(designation: any, event: Event) {
    event.stopPropagation();
    const control = this.masterService.teamForm.get('designations');
    const selected = control?.value || [];
    control?.setValue(selected.filter((d: any) => d.id !== designation.id));
  }
}
