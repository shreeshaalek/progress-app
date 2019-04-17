import { Component, OnInit } from '@angular/core';
import { FirebaseUtilsService } from '../../firebase-utils.service';
import { HelpersService } from '../../service/helpers.service';
import { LogModalComponent } from '../log-modal/log-modal.component';

@Component({
  selector: 'app-habits-list',
  templateUrl: './habits-list.component.html',
  styleUrls: ['./habits-list.component.scss']
})
export class HabitsListComponent implements OnInit {

  private habitList: Array<Object>;
  private arrowClicked: Object = {};
  private selectedHabit;

  constructor(private firebaseUtils: FirebaseUtilsService, private helperService: HelpersService) { }

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
    const title = e.currentTarget.dataset.title;
    const habit = e.currentTarget.dataset.habit;
    const completed = e.currentTarget.dataset.completed;

    let habitList = this.arrayToObject(this.habitList, 'id');
    let subtaskArray = habitList[habit]['subTasks'];
    if(completed === 'false') {
      subtaskArray.forEach(item => (item.subTaskTitle === title) ?
        item.completed = true : null);

      this.helperService.setModalDom({ component: LogModalComponent, data: { habit, subtaskArray, title } })
      this.firebaseUtils.updateData(`habits/${habit}/subTasks`, subtaskArray);
    }
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
      return [`${Math.max(Math.ceil((taskCount / totalTask) * 100), 5)}%`, taskCount, totalTask]
    }
    else {
      return [`5%`, 0, 0];
    }
  }
  calcloggedHours(logs) {
    let totalCount = 0;
    if (logs) {
      Object.keys(logs).map((item) => {
        if(logs[item].length){
        logs[item].map((elem)=>{
          totalCount = totalCount + elem.logWork;
        })
      }
      })
    }
    return totalCount;
  }
  toggleSubTask(e) {
    if (this.arrowClicked[e.currentTarget.dataset.id])
      this.arrowClicked[e.currentTarget.dataset.id] = false;
    else
      this.arrowClicked[e.currentTarget.dataset.id] = true;
  }
  deleteHabit(e) {
    const habitId = e.currentTarget.dataset.id;
    this.selectedHabit = habitId;
    this.firebaseUtils.deleteData('habits/' + habitId);
    this.firebaseUtils.getHabitGoals(this, this.removeHabitFromGoal)
  }
  removeHabitFromGoal(goals) {
    goals.map((item) => {
      if (item.habitsList.indexOf(this.selectedHabit) !== -1) {
        item.habitsList.splice(item.habitsList.indexOf(this.selectedHabit), 1);
        if (item.habitsList.length > 0) {
          this.firebaseUtils.updateData(`goals/habitGoals/${item.id}/habitsList`, item.habitsList);
        }
        else {
          this.firebaseUtils.updateData(`goals/habitGoals/${item.id}`, null);
        }
      }
    });
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

