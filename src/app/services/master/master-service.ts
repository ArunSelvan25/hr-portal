import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DesignationInterface {
  id: number;
  name: string;
  status: string;
}
@Injectable({
  providedIn: 'root'
})

export class MasterService {

  // Injectors
  fb = inject(FormBuilder);

  // Variables
  statuses = [
    { value: 'active' },
    { value: 'inactive' },
  ];
  editingTeamId: number | null = null;

  // Signals
  designations = signal<DesignationInterface[]>([
    { id: 1, name: "Intern", status: "active" },
    { id: 2, name: "Trainee Software Engineer", status: "active" },
    { id: 3, name: "Junior Software Developer", status: "active" },
    { id: 4, name: "Associate Software Engineer", status: "active" },
    { id: 5, name: "Software Engineer", status: "active" },
    { id: 6, name: "Front-End Developer", status: "active" },
    { id: 7, name: "Back-End Developer", status: "active" },
    { id: 8, name: "Full-Stack Developer", status: "active" },
  ]);

  teamsList = signal([
    { id: 1,
      name: "PHP",
      status: "active",
      roles: [
        { id: 1, name: "Intern", status: "active" },
        { id: 2, name: "Trainee Software Engineer", status: "active" },
        { id: 3, name: "Junior Software Developer", status: "active" },
        { id: 4, name: "Associate Software Engineer", status: "active" },
        { id: 5, name: "Software Engineer", status: "active" },
        { id: 7, name: "Back-End Developer", status: "active" },
        { id: 8, name: "Full-Stack Developer", status: "active" },
      ]
    },
    { id: 2,
      name: "Angular",
      status: "active",
      roles: [
        { id: 1, name: "Intern", status: "active" },
        { id: 2, name: "Trainee Software Engineer", status: "active" },
        { id: 3, name: "Junior Software Developer", status: "active" },
        { id: 4, name: "Associate Software Engineer", status: "active" },
        { id: 5, name: "Software Engineer", status: "active" },
        { id: 6, name: "Front-End Developer", status: "active" },
      ]
    },
    { id: 3,
      name: "QA",
      status: "active",
      roles: [
        { id: 1, name: "Intern", status: "active" },
        { id: 5, name: "Software Engineer", status: "active" },
      ]
    },
  ]);

  showDesignationAddPopup = signal(false);
  isDesignationEditMode = signal(false);
  isTeamEditMode = signal(false);
  editingDesignationId: number | null = null;

  // Forms
  designationForm!: FormGroup;
  teamForm!: FormGroup;

  buildDesignationForm(designation: any = null) {
    this.designationForm = this.fb.group({
      name: [designation ? designation.name : '', [Validators.required, Validators.minLength(3)]],
      status: [designation ? designation.status : '', [Validators.required]],
    });
  }

  buildTeamForm(team: any = null) {
    this.teamForm = this.fb.group({
      name: [team ? team.name : '', [Validators.required, Validators.minLength(3)]],
      status: [team ? team.status : '', [Validators.required]],
      designations: [team ? team.designations || [] : [], [Validators.required]],
    });
  }

  toggleShowDesignationPopup(editMode = false, designation: any = null) {
    const newValue = !this.showDesignationAddPopup();
    this.showDesignationAddPopup.set(newValue);
    this.isDesignationEditMode.set(editMode);

    if (newValue) {
      if (editMode && designation) {
        this.editingDesignationId = designation.id;
        this.buildDesignationForm(designation);
      } else {
        this.editingDesignationId = null;
        this.buildDesignationForm();
      }
    }
  }

  onSubmitDesignationForm() {
    if (this.designationForm.invalid) return;

    const formValue = this.designationForm.value;
    console.log('this.designationForm.value', this.designationForm.value);

    if (this.isDesignationEditMode()) {
      const updated = this.designations().map(item =>
        item.id === this.editingDesignationId
          ? { ...item, name: formValue.name, status: formValue.status }
          : item
      );
      this.designations.set(updated);
    } else {
      this.designations.set([
        {
          id: this.designations().length + 1,
          name: formValue.name,
          status: formValue.status,
        },
        ...this.designations(),
      ]);
    }

    setTimeout(() => this.toggleShowDesignationPopup(false), 400);
  }

  onSubmitTeamForm() {
    if (this.teamForm.invalid) return;

    const formValue = this.teamForm.value;

    if (this.isTeamEditMode()) {
      // 🔹 Update existing team
      const updatedTeams = this.teamsList().map(team =>
        team.id === this.editingTeamId
          ? {
              ...team,
              name: formValue.name,
              status: formValue.status,
              roles: formValue.designations,
            }
          : team
      );
      this.teamsList.set(updatedTeams);
    } else {
      // 🔹 Add new team
      const newTeam = {
        id: this.teamsList().length + 1,
        name: formValue.name,
        status: formValue.status,
        roles: formValue.designations,
      };
      this.teamsList.set([...this.teamsList(), newTeam]);
    }

    console.log('Updated Teams:', this.teamsList());
  }

  toggleTeamPopup(editMode = false, team: any = null) {
    this.isTeamEditMode.set(editMode);

    if (editMode && team) {
      this.editingTeamId = team.id;
      this.buildTeamForm({
        ...team,
        designations: team.roles || [] // map 'roles' into 'designations'
      });
    } else {
      this.editingTeamId = null;
      this.buildTeamForm();
    }
  }

}
