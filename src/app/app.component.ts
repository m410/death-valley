import { Component } from '@angular/core';
import {DeathValleyService} from "ng-death-valley";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private deathValleyService: DeathValleyService
  ) {
    console.log(`I got it: ${this.deathValleyService}`)
  }
}
