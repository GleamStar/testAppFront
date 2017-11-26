import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import 'rxjs/add/operator/takeUntil';
import {UpsertStudent} from "../../common/models/upsertStudent";
import {StudentsService} from "../../common/services/students.service";
export interface ConfirmModel {
  classId: string;
}
@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html'
})
export class AddStudentModalComponent extends DialogComponent<ConfirmModel,boolean> implements ConfirmModel {
  public classId: string;
  public name: string;
  public surname: string;
  public dob: Date;
  public gpa: number;
  public mouseoverLogin: boolean;
  constructor(dialogService: DialogService, private studentService: StudentsService) {
    super(dialogService);
  }
  ngOnInit() {
  }
  confirm(value: UpsertStudent)
  {
    console.log(value);
    this.studentService.addStudent(this.classId, value)
      .takeUntil(componentDestroyed(this))
      .subscribe();
    this.result = true;
    this.close();
  }
  setDateValue(form, input, value) {
    form.controls[input].setValue(value);
  }
}
