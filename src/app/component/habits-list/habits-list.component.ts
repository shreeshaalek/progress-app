import { Component, OnInit } from '@angular/core';
import { FirebaseUtilsService } from '../../firebase-utils.service';

@Component({
  selector: 'app-habits-list',
  templateUrl: './habits-list.component.html',
  styleUrls: ['./habits-list.component.scss']
})
export class HabitsListComponent implements OnInit {

  private habitList: Array<Object>;
  constructor(private firebaseUtils: FirebaseUtilsService) { }

  ngOnInit() {
    this.firebaseUtils.getHabits(this, this.formatList);
  }
  formatList(habits) {
    habits.forEach((item) => {
      item['progressWidth'] = this.calcProgressWidth(item);
      item['totalLogged'] = this.calcloggedHours(item.loggedWorks);
    });
    this.habitList = habits
  }
  selectSubTask(e) {
    let title = e.currentTarget.dataset.title;
    let habit = e.currentTarget.dataset.habit;
    let completed = e.currentTarget.dataset.completed;
    let habitList = this.arrayToObject(this.habitList, 'id');
    let subtaskArray = habitList[habit]['subTasks'];
    if (completed === "true") {
      subtaskArray.forEach(item => (item.subTaskTitle === title) ?
        item.completed = false : null);
    }
    else {
      subtaskArray.forEach(item => (item.subTaskTitle === title) ?
        item.completed = true : null);
    }
    this.firebaseUtils.updateData(`habits/${habit}/subTasks`, subtaskArray);
  }
  checkCompleted(completed) {
    return (completed) ? 'selected' : '';
  }
  arrayToObject = (array, val) =>
    array.reduce((obj, item) => {
      obj[item[val]] = item
      return obj
    }, {});

  objectToArray = (array) => {
    let newArr = [];
    Object.keys(array).map((item) => {
      newArr.push(array[item])
    })
    return newArr;
  }
  calcProgressWidth(obj) {
    const { subTasks } = obj;
    if (subTasks) {
      let taskCount = 0;
      let totalTask = subTasks.length;
      subTasks.map((item) => {
        item.completed ? taskCount++ : null;
      });
      return [`${Math.ceil((taskCount / totalTask) * 100)}%`, taskCount, totalTask]
    }
    else {
      return [`0%`, 0, 0];
    }
  }
  calcloggedHours(logs){
    let totalCount = 0;
    if(logs){
      Object.keys(logs).map((item)=>{
        totalCount = totalCount + logs[item];
      })
    }
    return totalCount;
  }
  // if(arr){
  //   let taskCount = 0
  //   let totalTask = arr.length;
  //   arr.map((item)=>{
  //     item.completed ? taskCount++ : null;
  //   });
  //   let width = taskCount/totalTask;
  //   this.progressBar[id] =  `${Math.ceil(width*100)}px`;
  // }
  // else {
  //   this.progressBar[id] =  `0px`;
  // }
  // console.log(this.progressBar[id]);
}

