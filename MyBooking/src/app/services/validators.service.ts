import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

// This is reusable code which is written by me and posted on this repository
//github.com/Suhas-Nadarge/Reusable-Code/blob/master/Validations_Angular.txt
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  todayDate = new Date();

  constructor() { }


     //**use this for all fields with numbers input
    // it will not allow to enter alph-special chaarcter from keyboard itself**
    allowedOnlyKeyboardNumbers(event: any): any {
      const codeArray = [8, 9, 37, 39, 45, 46,111];
      const symbArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
      const k = event.keyCode;
      if (symbArray.includes(event.key)) {
        return false;
      }
      if (codeArray.includes(k) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105)) {
        return true;
      }
      return false;
    }
  
    isValidEmail(control: AbstractControl): { [key: string]: boolean } | null {
      const emailRegExp = /^[a-zA-Z0-9](?:[a-zA-Z0-9-._!]{0,63})?@[a-zA-Z0-9]([a-z0-9-]{0,125})?(\.[a-zA-Z]([A-Za-z0-9]{0,62}))+$/ig;
      const email = control.value;
      if ((email && !emailRegExp.test(email))) {
        return { 'invalidEmail': true };
      }
      return null;
    }
  //  this First char space, two space and alpha number with space
  alphaNumbersSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (control.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (control.value.includes('  ')) ? { 'twoSpace': true } :
            (!control.value.match(/^[a-zA-Z0-9 ]+$/)) ? { 'alphaNumbersWithSpace': true } : null;
    };
  }

  alphaNumbersExceptSpaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return !control.value ? null :
      (control.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
        (control.value.includes(' ')) ? { 'alphaNumericWithNoSpace': true } : null;
  }
  alphaNumbersExceptDoubleSpaceValidator(): ValidatorFn {
    return (contr: AbstractControl): { [key: string]: boolean } | null => {
      return !contr.value ? null :
        (contr.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (contr.value.includes('  ')) ? { 'alphaNumbersWithDoubleSpace': true } : null;
    };
  }


  //  this First char space, two space and alpha with space
  alphaSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (control.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (control.value.includes('  ')) ? { 'twoSpace': true } :
            (!control.value.match(/^[a-zA-Z ]+$/)) ? { 'alphaWithSpace': true } : null;
    };
  }
  //  this First char space, two space and alpha number with space
  alphaNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (control.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (control.value.includes('  ')) ? { 'twoSpace': true } :
            (!control.value.match(/^[a-zA-Z0-9]+$/)) ? { 'alphaNumbersSpace': true } : null;
    };
  }
//
  // url validations
  urlValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (control.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (control.value.includes(' ')) ? { 'alphaNumericWithNoSpace': true } :
            // tslint:disable-next-line: max-line-length
            (!control.value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ig)) ? { 'urlValidator': true } : null;
    };
  }


  //  this First char space, two space and alpha with space
  alphaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (control.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (control.value.includes('  ')) ? { 'twoSpace': true } :
            (!control.value.match(/^[a-zA-Z]+$/)) ? { 'alphaSpace': true } : null;
    };
  }
  noSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
          (!control.value.match(/^[a-zA-Z0-9]+$/)) ? { 'alphaSpace': true } : null;
    };
  }
  // validator upto previous date
  previousDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
        control.value && this.compareToPreviousDate(control.value) ? { 'previousDate': true } : null;
    };
  }
  compareToPreviousDate(selectDate: any): any {
    const now = new Date(new Date().setHours(0, 0, 0, 0));
    selectDate = new Date(selectDate.setHours(0, 0, 0, 0));
    return (now <= selectDate);
  }

  // validator upto current date
  currentDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
        control.value && moment().isBefore(control.value) ? { 'currentDate': true } : null;
    };
  }

  defalutDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } : null;
    };
  }

  currentDate(selectDate: any): any {
    const now = new Date(new Date().setHours(0, 0, 0, 0));
    selectDate = new Date(selectDate.setHours(0, 0, 0, 0));
    return (now < selectDate);
  }

  // validator date from current date to futher date
  futureDateFromCurrentValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
        control.value && this.compareToNextDate(control.value) ? { 'futureDateFromCurrentDate': true } : null;
    };
  }
  compareToNextDate(selectDate: any): any {
    const now = new Date(new Date().setHours(0, 0, 0, 0));
    selectDate = new Date(selectDate.setHours(0, 0, 0, 0));
    return (now > selectDate);
  }

  // validator date from next date to futher date
  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
        control.value && this.futureDate(control.value) ? { 'futureDate': true } : null;
    };
  }

  futureDate(selectDate: any): any {
    return moment().startOf('day').add(1, 'days').isSameOrBefore(selectDate);
  }

  checkFormat(selectDate: any): any {
    if (selectDate.toString() === 'Invalid Date') {
      return true;
    }
    return false;
  }

  dateAllowedOnlyNumbers(event: any): any {
    const codeArray = [8, 9, 37, 39, 45, 46, 191, 111];
    const symbArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    const k = event.keyCode;
    if (symbArray.includes(event.key)) {
      return false;
    }
    if (codeArray.includes(k) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105)) {
      return true;
    }
    return false;
  }
  // allowed numbers with positive and Negative
  allowedOnlyRoundedNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && !String(control.value).match(/^-?[0-9]\d*(\d+)?$/) ? { 'allowedNumbers': true } : null;
    };
  }

  allowedNumberWithDecimal(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && !String(control.value).match(/^-?[0-9]+(\.[0-9]{1,})?$/) ? { 'allowedNumbers': true } : null;
    };
  }

  allowedNumberDecimalWithNegative(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && !control.value.match(/^[-/0-9,.$]+$/) ? { 'allowedDecimals': true } : null;
    };
  }

  // allowed only numbers
  allowedOnlyNUmbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && !control.value.toString().match(/^[0-9]+$/) ? { 'allowedNumbers': true } : null;
    };
  }
  // allowed only Currency symbols and amount
  allowedOnlyCurrencyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && !control.value.match(/^[0-9,.$]+$/) ? { 'allowedNumbers': true } : null;
    };
  }
 
  // allowed only numbers
  allowedOnlyPositiveNUmbersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && !control.value.match(/^[0-9]+$/) ? { 'allowedPositiveNumbers': true } : null;
    };

  }

  // compare two dates first date should not be more than the current date
  twoDatesValidator(second: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
        control.value && second.value && moment(control.value).isSameOrBefore(second.value) ? { 'twoDates': true } : null;
    };
  }
  twoDatesValidator2(second: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
        control.value && second.value && moment(control.value).isBefore(second.value) ? { 'twoDatesIsBefore': true } : null;
    };
  }
  // numbers with length validator( pass the length)
  numbersWithLengthValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null : control.value && !control.value.match(/^[0-9]+$/) ? { 'allowedOnlyNUmbers': true } :
        (control.value && control.value.length < min) ? { 'allowedNumbers': true } :
          (control.value && this.validateAllZeros(control.value, min)) ? { 'invalid': true } : null;
    };
  }
  // compare two dates second date should not be more than the current date
  twoDatesExpValidator(second: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
          (control.value && second.value && control.value) <= second.value ? { 'twoDatesExp': true } :
            (control.value && moment().isAfter(control.value)) ? { 'moreCurrentDate': true } : null;
    };
  }
  ssnValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null : (control.value && control.value.length < min) ? { 'minLength': true } :
        (control.value && this.validateAllZeros(control.value, min)) ? { 'invalid': true } : null;
    };
  }
  validateAllZeros(value: any, min: any): any {
    if (min === 4 && '0000' === value) {
      return true;
    }
    if (min === 5 && '00000' === value) {
      return true;
    }
    return null;
  }
  getDate(selectDate: any): any {
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), selectDate.getMonth(), selectDate.getDate());
    return (now < currentDate);
  }

  isTouchedDirty(groupName: any, fieldName: string): boolean {
    return groupName.get(fieldName).invalid && (groupName.get(fieldName).dirty || (groupName.get(fieldName).touched));
  }

  zipCodeValidator(min: number): ValidatorFn {
    return (cont: AbstractControl): { [key: string]: boolean } | null => {
      return !cont.value ? null : cont.value && !cont.value.match(/^[0-9]+$/) ? { 'allowedOnlyNUmbers': true } :
        (cont.value && cont.value.length < min) ? { 'minLength': true } :
          (cont.value && this.validateAllZeros(cont.value, min)) ? { 'invalid': true } : null;
    };
  }

  //  this First char space, two space and alpha number with space
  alphaNumericValidator(): ValidatorFn {
    return (con: AbstractControl): { [key: string]: boolean } | null => {
      return !con.value ? null :
        (con.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (con.value.includes('  ')) ? { 'twoSpace': true } :
            (!con.value.match(/^[a-zA-Z0-9]+$/)) ? { 'alphaNumeric': true } : null;
    };
  }

  percentageComparison(pervious: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (control.value && this.percentageAndLimitPercentageComparison(control.value, pervious)) ? { 'percentLimit': true } : null;
    };
  }

  percentageAndLimitPercentageComparison(value: any, previousVal: any): any {
    // tslint:disable-next-line:no-collapsible-if
    if (previousVal.value) {
      if (Number(previousVal.value) >= 1 && Number(previousVal.value) <= 100 && Number(value) >= 1 && Number(value) <= 100) {
        value = parseFloat(value);
        if (value > previousVal.value) {
          return true;
        }
        return null;
      }
    }
    return null;

  }
  nameValidator(): ValidatorFn {
    return (con: AbstractControl): { [key: string]: boolean } | null => {
      return !con.value ? null :
        (con.value.charAt(0).includes(' ')) ? { 'firstCharSpace': true } :
          (con.value.includes('  ')) ? { 'twoSpace': true } :
            (!con.value.match(/^[a-zA-Z0-9 ]+$/)) ? { 'allowedAlphaAndNumbersWithSpace': true } : null;
    };
  }
  onlyNumericValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (!control.value.match(/^[0-9]+$/)) ? { 'allowedNumbers': true } : null;
    };
  }

  passwordValidation(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let count = 0;
      const hasUpperCase = /[A-Z]/.test(control.value);
      const hasLowerCase = /[a-z]/.test(control.value);
      const hasNumbers = /\d/.test(control.value);
      const hasSplChar = /[\W\_]/.test(control.value);
      const temp = [hasUpperCase, hasLowerCase, hasNumbers, hasSplChar];
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < temp.length; index++) {
        if (temp[index]) {
          count++;
        }
      }
      return !control.value ? null : (count === 4) && (control.value && control.value.length >= min) ? null : { 'password': true };
    };
  }
  numericRangeValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (!control.value.match(/^(?:[1-9]|0[1-9]|10)$/)) ? { 'rageNumbers': true } : null;
    };
  }

  yearFormateValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (!control.value.match(/^[0-9]+$/)) ? { 'allowedNumbers': true } :
          (!control.value.match(/^((?!(0))[0-9]{4})$/)) ? { 'yearFormate': true } : null;

    };
  }
  alphaNumaricWithOutSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (!control.value.match(/^[a-zA-Z0-9]+$/)) ? { 'allowedAlphaAndNumbersWithSpace': true } : null;
    };
  }

  //  this First char space, two space
  allowAllWithoutFirstSpaceAndTwoSpace(): ValidatorFn {
    return (contro: AbstractControl): { [key: string]: boolean } | null => {
      return !contro.value ? null :
        (contro.value.charAt(0).includes(' ')) ? { 'firstSpace': true } :
          (contro.value.includes('  ')) ? { 'twoSpace': true } : null;
    };
  }

  dateValidations(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return control.value && this.checkFormat(control.value) ? { 'InvalidDate': true } :
        (control.value && this.checktodayTimeVal(control.value)) ? { 'checkTodayTime': true } : null;
    };
  }

  checktodayTimeVal(selectDate: any): any {
    const todayDate = moment(this.todayDate).format('MM/DD/YYYY');
    const payDate = moment(selectDate).format('MM/DD/YYYY');

    const noOfWeekDay = moment().day();
    const todatTime = moment('15:00', 'HH:mm');
    const payDateTime = moment(selectDate).format('HH:mm');
    const checkTime = noOfWeekDay > 0 && noOfWeekDay < 7 ? moment().isSameOrAfter(todatTime) : moment().isSameOrAfter(payDateTime);
    if (checkTime && todayDate === payDate) {
      return true;
    }
    return false;

  }
 

  fieldWithFirstCharSpace(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value ? null :
        (control.value.charAt(0).includes(' ')) ? { 'firstSpace': true } : null;
    };
  }

  StringZeroValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !control.value || Number(control.value) === 0 ? { 'emptyValue': true } : null;
    };
  }
  passwordMatchValidator(control: AbstractControl) {
    if (control.get('newpwd')!.value !== '' && control.get('confpwd')!.value) {
      const password = control.get('newpwd')!.value; // get password from our password form control
      const confirmPassword = control.get('confpwd')!.value; // get password from our confirmPassword form control
      // compare is the password math
      if (password !== confirmPassword) {
        // if they don't match, set an error in our confirmPassword form control
        control.get('confpwd')!.setErrors({ 'NoPassswordMatch': true });
      }
    }
  }
}