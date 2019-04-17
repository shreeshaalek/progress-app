import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../../service/helpers.service';
import { AddGoalsComponent } from '../../component/add-goals/add-goals.component'

@Component({
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrls: ['./goals-page.component.scss']
})
export class GoalsPageComponent implements OnInit {

  constructor(private helperService: HelpersService) { }

  ngOnInit() {
  }
  addgoals(e){
    // console.log(AddGoalsComponent);
    // let addHabitTemplate = `<app-add-habits></app-add-habits>`
    this.helperService.setModalDom({component:AddGoalsComponent})
  }
}
