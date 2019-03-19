import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { FirebaseUtilsService } from '../../firebase-utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.scss']
})
export class AddGoalsComponent implements OnInit {

  private priorityVal;
  private title:String='';
  private endDate:string; 
  private habitList:Array<Object>=[];
  private habitArr=[];
  private priorityList:Array<String>=['P1','P2','P3','P4'];

  constructor(private fb: FormBuilder, private firebaseUtils:FirebaseUtilsService) { }

  ngOnInit() {
  this.firebaseUtils.getHabits(this,this.formatList);
  }
  formatList(habits) {

    this.habitList = habits;
  }
  selectHabit(e) {
    let clickedHabit = e.currentTarget
    if(clickedHabit.dataset.selected !== 'true'){
      this.habitArr.push(clickedHabit.id);
      clickedHabit.dataset.selected = true;
      clickedHabit.classList.add('selected');
    }
    else {
      this.habitArr = this.habitArr.filter((item)=>clickedHabit.id !== item)
      clickedHabit.dataset.selected = false;
      clickedHabit.classList.remove('selected');
    }
  }
  generateId() {
    let timestamp = moment().format('YYMMDDHHmmss');
    return 'GOAL-'+timestamp;
  }
  onSubmit(){
    let goalId = this.generateId();

    this.firebaseUtils.setUserData('goals/habitGoals/'+goalId,{id:goalId},{endDate:moment(new Date(this.endDate)).format('MM-DD-YYYY')}, {title:this.title}, {user:'103150873432940546560'},{priority: this.priorityVal},{habitsList: this.habitArr});
  }

}
