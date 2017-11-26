import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import { UpsertClass } from '../../common/models/upsertClass';
import 'rxjs/add/operator/takeUntil';
import {ClassesService} from "../../common/services/classes.service";
export interface ConfirmModel {

}
@Component({
  selector: 'app-add-class-modal',
  templateUrl: './add-class-modal.component.html'
})
export class AddClassModalComponent extends DialogComponent<ConfirmModel,boolean> implements ConfirmModel {
  public mouseoverLogin: boolean;
  public name: string;
  public teacher: string;
  public location: string;
  constructor(dialogService: DialogService, private classService :ClassesService) {
    super(dialogService);
  }
  confirm(value: UpsertClass) {
    this.classService.addClass(value)
      .takeUntil(componentDestroyed(this))
      .subscribe();
    this.result = true;
    this.close();
  }
  ngOnInit() {
  }

}
