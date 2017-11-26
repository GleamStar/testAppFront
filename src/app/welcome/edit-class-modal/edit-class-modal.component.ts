import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import 'rxjs/add/operator/takeUntil';
import {Class, UpsertClass} from "../../common/models/index";
import {ClassesService} from "../../common/services/classes.service";
export interface ConfirmModel {
  formValue: Class
}
@Component({
  selector: 'app-edit-class-modal',
  templateUrl: './edit-class-modal.component.html'
})
export class EditClassModalComponent  extends DialogComponent<ConfirmModel,boolean> implements ConfirmModel , OnInit{
  public mouseoverLogin: boolean;
  public formValue: Class;
  public values: Class;
  constructor(dialogService: DialogService, private classService: ClassesService) {
    super(dialogService);

  }
  confirm(value: UpsertClass) {
    this.classService.updateClass(this.formValue.classId,value)
      .takeUntil(componentDestroyed(this))
      .subscribe();
    this.result = true;
    this.close();
  }
  ngOnInit() {
    this.values = Object.create(this.formValue);
  }

}
