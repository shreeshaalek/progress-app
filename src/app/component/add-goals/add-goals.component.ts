import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  private priorityArr = ['critical','high','medium','low']
  private description:string; 
  private habitList:Array<Object>=[];
  private habitArr=[];
  private navVal:string='Next';
  private showHabits:Boolean = false;
  private disableSubmit:Boolean = true;
  private priorityList:Array<number>=[1,2,3,4];

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
  getPriority(priority) {
    return this.priorityArr[parseInt(priority)-1];
  }
  onToggleNav() {
    this.disableSubmit = false;
    if(this.navVal === 'Next') {
      this.navVal = 'Prev'
      this.showHabits = true;
    }
    else {
      this.navVal = 'Next'
      this.showHabits = false;
    }
  }
  onSubmit(){
    let goalId = this.generateId();
    let checkFlag = !!this.priorityVal && !!this.title && !!this.description && !!this.endDate && !!this.habitList;
    if(checkFlag){
      this.firebaseUtils.setUserData('goals/habitGoals/'+goalId,{id:goalId},{endDate:moment(new Date(this.endDate)).format('MM-DD-YYYY')}, {title:this.title}, {user:'103150873432940546560'},{description:this.description},{priority: this.priorityVal},{habitsList: this.habitArr});
    }
  }

}
