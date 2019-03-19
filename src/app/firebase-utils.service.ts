import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUtilsService {

  private database: any;

  constructor() {
    this.database = firebase.database();
  }

  setUserData = (...params) => {
    let paramObj = {};
    params.map((item, index) => {
      if (index !== 0) {
        Object.assign(paramObj, item);
      }
    });

    this.database.ref(params[0]).set(paramObj);
  }

  createCurrUserList = (snap,callBack,ref)=>{
    let habitsList = [];
    let habits = snap.val();
    for (const key in habits) {
      if (habits[key]['user'] === "103150873432940546560") {
        habitsList.push(habits[key]);
      }
    }
    callBack.call(ref,habitsList)
  }
  getHabits = (ref,callBack) => {
      firebase.database().ref('habits').on('value', (snap) => {
        this.createCurrUserList(snap,callBack,ref)
      });
  }

  getHabitGoals = (ref,callBack) => {
    firebase.database().ref('goals/habitGoals').on('value', (snap) => {
      this.createCurrUserList(snap,callBack,ref)
    });
  }
  updateData = (reference,val) => {
    this.database.ref(reference).update(val);
  }

}
