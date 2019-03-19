import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FirebaseUtilsService } from '../../firebase-utils.service';
// import { Logs } from 'selenium-webdriver';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { splitNamespace } from '@angular/core/src/view/util';

@Component({
  selector: 'app-daily-logs',
  templateUrl: './daily-logs.component.html',
  styleUrls: ['./daily-logs.component.scss']
})
export class DailyLogsComponent implements OnInit {
  private logsObj: Array<Object> = [];
  private userHabits;
  private totalList: number = 0;
  constructor(private firebaseUtils: FirebaseUtilsService) { }

  ngOnInit() {
    this.getDailyLogs();
  }

  getDailyLogs() {

    this.userHabits = this.firebaseUtils.getHabits(this, this.setLogs);
  }
  setLogs(habits) {
    this.userHabits = habits;
    this.getLogsSet();
  }
  getLogsSet() {
    let logList = {};
    let logListArr = [];
    this.logsObj = [];

    this.userHabits.map((item) => {
      if (!!item['loggedWorks']) {
        Object.keys(item['loggedWorks']).map((elem) => {
          if (!logList[elem]) {
            logList = Object.assign(logList, { [elem]: { date: elem, formDate: moment(elem, "MM-DD-YYYY").format('Do MMM YY'), habitLists: [{ title: item.title, id: item.id, hours: item['loggedWorks'][elem] }] } })
          }
          else {
            logList[elem].habitLists.push({ title: item.title, id: item.id, hours: item['loggedWorks'][elem] })
          }
        })
      }
    });
    Object.keys(logList).map((item) => {
      logListArr.push(logList[item]);
    });
    logListArr.sort((a, b) => {
      if (new Date(b.date) > new Date(a.date))
        return 1;
      else {
        return -1;
      }
    })
    this.logsObj = logListArr;
  }

}
