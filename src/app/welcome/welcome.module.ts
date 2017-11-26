import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { userRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule }   from '@angular/forms';
import { ClassesListComponent } from './classes-list/classes-list.component';
import { AddClassModalComponent } from './add-class-modal/add-class-modal.component';
import { EditClassModalComponent } from './edit-class-modal/edit-class-modal.component';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { EditStudentModalComponent } from './edit-student-modal/edit-student-modal.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';


@NgModule({
  imports: [
    CommonModule,
    BootstrapModalModule.forRoot({container:document.body}),
    RouterModule.forChild(userRoutes),
    FormsModule,
    NguiDatetimePickerModule
  ],
  declarations: [MainComponent, NavbarComponent, ClassesListComponent, AddClassModalComponent, EditClassModalComponent, AddStudentModalComponent, EditStudentModalComponent, StudentsListComponent],
  entryComponents: [
    AddClassModalComponent,
    EditClassModalComponent,
    AddStudentModalComponent,
    EditStudentModalComponent
  ]
})
export class WelcomeModule { }
