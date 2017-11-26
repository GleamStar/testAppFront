import { Component, OnInit ,OnDestroy} from '@angular/core';
import {ClassesService} from "../../common/services/classes.service";
import {Observable} from "rxjs/Observable";
import {Class} from "../../common/models/class";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import 'rxjs/add/operator/takeUntil';
import {DialogService} from "ng2-bootstrap-modal"
import {AddClassModalComponent} from "../add-class-modal/add-class-modal.component";
import {EditClassModalComponent} from "../edit-class-modal/edit-class-modal.component";
import {StudentsService} from "../../common/services/students.service";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html'
})
export class ClassesListComponent implements OnInit,OnDestroy {
  public classes : Observable<Class[]>

  constructor(private classesService: ClassesService,private studentService: StudentsService, private dialogService: DialogService) { }

  ngOnInit() {
    this.classes = this.classesService.data;
  }
  ngOnDestroy(){

  }
  delete(classId: string){
     this.classesService.deleteClass(classId)
       .takeUntil(componentDestroyed(this))
       .subscribe(res => this.studentService.clear());
  }
  add(){
    this.dialogService.addDialog(AddClassModalComponent);
  }
  edit(value: Class){
    this.dialogService.addDialog(EditClassModalComponent, {formValue: value});
  }
  choosenClass(classId: string){
    this.studentService.change(classId);
  }
}
