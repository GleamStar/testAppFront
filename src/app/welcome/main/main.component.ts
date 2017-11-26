import {Component, OnInit, OnDestroy} from '@angular/core';

import {componentDestroyed} from "ng2-rx-componentdestroyed";
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit,OnDestroy  {


  ngOnInit() {

  }
  ngOnDestroy(): void {

  }
}
