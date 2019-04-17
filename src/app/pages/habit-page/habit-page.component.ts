import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../../service/helpers.service';
import { AddHabitsComponent } from '../../component/add-habits/add-habits.component'

@Component({
  selector: 'app-habit-page',
  templateUrl: './habit-page.component.html',
  styleUrls: ['./habit-page.component.scss']
})
export class HabitPageComponent implements OnInit {
  // private profileForm;
  constructor(private helperService: HelpersService) { }

  ngOnInit() {

  }
  addHabits(e){
    // let addHabitTemplate = `<app-add-habits></app-add-habits>`
    this.helperService.setModalDom({component:AddHabitsComponent})
  }

}
