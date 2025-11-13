import { Component, HostListener, OnInit, inject } from '@angular/core';
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
  // Inject service
  masterService = inject(MasterService);

  // UI states
  showDesignationDropdown = false;
  animatePopup = false;
  isOpen = false;
  showSlideIn = false;

  ngOnInit(): void {
    this.masterService.buildDesignationForm();
    this.masterService.buildTeamForm();
  }

  /* -------------------------------
   *  DESIGNATION POPUP METHODS
   * ----------------------------- */
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

  /* -------------------------------
   *  TEAM POPUP METHODS (ADD + EDIT)
   * ----------------------------- */

  openPopup(editMode = false, team: any = null) {
    this.masterService.toggleTeamPopup(editMode, team);
    this.isOpen = true;
    setTimeout(() => (this.showSlideIn = true), 60);
  }

  editTeam(team: any) {
    console.log('Editing team:', team);
    this.openPopup(true, team);
  }

  closePopup() {
    this.showSlideIn = false;
    setTimeout(() => (this.isOpen = false), 60);
  }

  onTeamSubmit() {
    if (this.masterService.teamForm.invalid) {
      this.masterService.teamForm.markAllAsTouched();
      return;
    }

    this.masterService.onSubmitTeamForm();
    this.closePopup();
  }

  /* -------------------------------
   *  DESIGNATION MULTISELECT LOGIC
   * ----------------------------- */

  // Closes dropdown on outside click
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.designation-dropdown-container')) {
      this.showDesignationDropdown = false;
    }
  }

  // Toggles dropdown open/close
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
