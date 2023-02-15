////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const { DateTime, Info } = require('luxon');

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  Third Party Middleware

////////////////////////////////////////////
//  My Middleware

////////////////////////////////////////////
//  Routing Middleware

////////////////////////////////////////////
//  My Modules

/////////////////////////////////////////
//  Calendar Model
module.exports = class Calendar {
  constructor() {
    this.date = DateTime.now();
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = Info.months('long');
    this.monthIndex = this.months.indexOf(this.date.monthLong);
    this.hours = this.date.hour;
    this.day = this.date.day;
  }

  getMinutes() {
    return this.date.getMinutes() < 10 ? `0${this.date.getMinutes()}` : this.date.getMinutes();
  }

  getHour() {
    if (this.hours === 0 || this.hours === 24) return (this.hours = 12);
    if (this.hours >= 13 && this.getMinutes() >= 0) {
      return (this.hours = this.hours - 12);
    }
    return this.hours;
  }

  getTimeOfDay() {
    return this.date.hour < 12 ? (this.timeOfDay = `AM`) : (this.timeOfDay = `PM`);
  }

  getDay() {
    return this.day;
  }

  getGreeting() {
    if (this.hours < 12) {
      return (this.greeting = `Good Morning`);
    }
    if (this.hours >= 12 && this.hours < 18) {
      return (this.greeting = `Good Afternoon`);
    }
    if (this.hours >= 18) {
      return (this.greeting = `Good Evening`);
    }
  }

  getWeekday() {
    return this.date.weekdayLong;
  }

  getMonth() {
    return this.date.monthLong;
  }

  getYear() {
    return this.date.year;
  }

  monthRemaining() {
    let days;
    const currentMonth = this.getMonth();
    const currentDay = this.getDay();
    if (
      currentMonth === `January` ||
      currentMonth === `March` ||
      currentMonth === `May` ||
      currentMonth === `July` ||
      currentMonth === `August` ||
      currentMonth === `October` ||
      currentMonth === `December`
    ) {
      days = 31;
    }
    if (currentMonth === `April` || currentMonth === `June` || currentMonth === `September` || currentMonth === `November`) {
      days = 30;
    }
    if (currentMonth === `February`) {
      (this.getYear() % 4 === 0 && !(this.getYear() % 100 === 0)) || this.getYear() % 400 === 0 ? (days = 29) : (days = 28);
    }
    const remaining = days - currentDay;
    const percentage = remaining / days;
    const calculatedPercent = (100 * percentage).toFixed(0);
    return `${calculatedPercent}%`;
  }
};
