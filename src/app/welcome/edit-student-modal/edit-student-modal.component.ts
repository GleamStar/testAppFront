import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import 'rxjs/add/operator/takeUntil';
import { Student } from '../../common/models/index';
import {UpsertStudent} from "../../common/models/upsertStudent";
import {StudentsService} from "../../common/services/students.service";
export interface ConfirmModel {
  classId : string;
  formValue: Student;
}
@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html'
})
export class EditStudentModalComponent extends DialogComponent<ConfirmModel,boolean> implements ConfirmModel {
  public formValue: Student;
  public values: Student;
  public classId : string;
  public mouseoverLogin: boolean;
  constructor(dialogService: DialogService, private studentService: StudentsService) {
    super(dialogService);
  }

  ngOnInit() {
    this.values = Object.create(this.formValue);
  }

  confirm(value: UpsertStudent)
  {
    console.log(value);
    this.studentService.updateStudent(this.classId,this.formValue.studentId, value)
      .takeUntil(componentDestroyed(this))
      .subscribe();
    this.result = true;
    this.close();
  }
  setDateValue(form, input, value) {
    form.controls[input].setValue(value);
  }
}
