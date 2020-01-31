import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FirebaseUtilsService } from '../../firebase-utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-habits',
  templateUrl: './add-habits.component.html',
  styleUrls: ['./add-habits.component.scss']
})
export class AddHabitsComponent implements OnInit {
  private habitForm;

  ngOnInit() {
    this.habitForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      estimate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      subTaskList: this.fb.array([this.subTaskGroup()])
    });
  }

  generateId() {
    let timestamp = moment().format('YYMMDDHHmmss');
    return 'HABIT-' + timestamp;
  }
  addSubTask() {
    (<FormArray>this.habitForm.get('subTaskList')).push(this.subTaskGroup())
  }
  removeSubTask(index) {
    (<FormArray>this.habitForm.get('subTaskList')).removeAt(index);
  }
  subTaskGroup() {
    return this.fb.group({
      completed: false,
      subTaskTitle: new FormControl('', [Validators.required]),
    })
  }
  onSubmit() {
    let habitId = this.generateId()
    if(this.habitForm.status === 'VALID'){
      this.firebaseUtils.setUserData('habits/' + habitId, { id: habitId }, { hoursEstimate: this.habitForm.value.estimate }, { loggedWorks: '' }, { title: this.habitForm.value.title }, { user: '103150873432940546560' }, { subTasks: this.habitForm.value.subTaskList }, { description: this.habitForm.value.description })
    }
  }

  constructor(private fb: FormBuilder, private firebaseUtils: FirebaseUtilsService) { }
}

