import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../../common/services/students.service";
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from "rxjs/Observable";
import {Student} from "../../common/models/student";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {AddStudentModalComponent} from "../add-student-modal/add-student-modal.component";
import {EditStudentModalComponent} from "../edit-student-modal/edit-student-modal.component";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  public students : Observable<Student[]>

  constructor(private studentsService: StudentsService, private dialogService: DialogService) { }

  ngOnInit() {
    this.students = this.studentsService.data;
  }
  getAge(dob: Date): number{
    console.log(dob);

    return (new Date()).getFullYear() - new Date(dob).getFullYear();
  }
  ngOnDestroy(){

  }
  delete(studentId: string){
    this.studentsService.deleteStudent(studentId)
      .takeUntil(componentDestroyed(this))
      .subscribe();
  }
  setStyle(value: number){
     if(value > 3.2){
       return 'red'
     }
  }
  add(){
    this.dialogService.addDialog(AddStudentModalComponent, {classId : this.studentsService.currentClassId});
  }
  edit(value: Student){
    this.dialogService.addDialog(EditStudentModalComponent,{ formValue: value, classId : this.studentsService.currentClassId});
  }
}
