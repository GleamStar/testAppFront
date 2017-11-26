import { NgModule, ModuleWithProviders } from '@angular/core';
import { BASE_URL, ApiService, ClassesService , StudentsService} from '../common/services/index';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: []
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: BASE_URL, useValue: 'http://testtaskback.azurewebsites.net/api/'},
        ApiService,
        ClassesService,
        StudentsService
      ]
    };
  }
}
