import { Component, OnInit, Input } from '@angular/core';
import { FirebaseUtilsService } from '../../firebase-utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.scss']
})
export class LogModalComponent implements OnInit {

  @Input() data:any;
  private logWork:number
  constructor(private firebaseUtils: FirebaseUtilsService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.firebaseUtils.getDataFromRef(this,`habits/${this.data.habit}/loggedWorks`, this.handlelogArr);
    this.firebaseUtils.updateData(`habits/${this.data.habit}/subTasks`, this.data.subtaskArray);
  }
  handlelogArr(logs) {
    const todayDate = moment(new Date(), "MM-DD-YYYY").format('MM-DD-YYYY');
    const { title } = this.data;
    const { logWork } = this;
    if(!!logs[todayDate]){
      logs[todayDate].push({title,logWork})
    }
    else {
      logs = {};
      logs[todayDate] = [{title,logWork}]
    }
    this.firebaseUtils.updateData(`habits/${this.data.habit}/loggedWorks`, logs);
  }
}
