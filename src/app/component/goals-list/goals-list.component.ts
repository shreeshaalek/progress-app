import { Component, OnInit } from '@angular/core';
import { FirebaseUtilsService } from '../../firebase-utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.scss']
})
export class GoalsListComponent implements OnInit {

  private habitList:Array<Object>;
  private goalList:Array<Object>;
  private arrowClicked: Object = {};
  private priorityArr = ['critical','high','medium','low']
  constructor(private firebaseUtils: FirebaseUtilsService) { }

  ngOnInit() {
    this.firebaseUtils.getHabits(this,this.getHabit);
  }

  arrayToObject = (array,val) =>
   array.reduce((obj, item) => {
     obj[item[val]] = item
     return obj
   }, {})
  
  getHabit(habits) {
    this.habitList = this.arrayToObject(habits,'id');
    this.firebaseUtils.getHabitGoals(this,this.getGoals);
  }
  getGoals(goals) {
    this.goalList = goals;
  }

  deleteGoals(e) {
    const goalId = e.currentTarget.dataset.id;
    this.firebaseUtils.deleteData('goals/habitGoals/'+goalId);
  }

  formatDate(date) {
    return moment(date).format("DD MMM YYYY");;
  }
  getHabitTitle(habitId) {
    return this.habitList[habitId]['title'];;
  }
  getPriority(index) {
    return this.priorityArr[parseInt(index)-1];
  }
  checkCompleted(habitId) {
    let completed = true;
    if(!!this.habitList[habitId]['subTasks']){
      this.habitList[habitId]['subTasks'].map((elem)=>{
        if(!elem.completed){
          completed = false;
        }
      });
    }
    return (completed) ? 'selected' : '';
  }
  toggleHabitList(e) {
    if (this.arrowClicked[e.currentTarget.dataset.id])
      this.arrowClicked[e.currentTarget.dataset.id] = false;
    else
      this.arrowClicked[e.currentTarget.dataset.id] = true;
  }
  calcProgress(goalArr){
    let totalTaskCount,completeCount,goalCount=0,taskPerc = 0,totalPerc = 0;

    goalArr.map((item)=>{
      totalTaskCount=0;
      completeCount=0;
      if(!!this.habitList[item]['subTasks']){
      this.habitList[item]['subTasks'].map((elem)=>{
        if(elem.completed){
          completeCount++;
        }
        totalTaskCount++;
      });
    }
      taskPerc = Math.floor((completeCount/totalTaskCount)*100);
      totalPerc = (totalPerc*goalCount + taskPerc)/++goalCount;
    });
    return `${totalPerc}px`;
  }

}
