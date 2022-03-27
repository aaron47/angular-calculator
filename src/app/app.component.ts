import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  input: string = '';
  result: string = '';

  pressNum(num: string) {
    // do not allow . more than once
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    // do not allow 0 in the beginning
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const prevKey = this.input[this.input.length - 1];
      if (
        prevKey == '÷' ||
        prevKey == '*' ||
        prevKey == '-' ||
        prevKey == '+'
      ) {
        return;
      }
    }

    this.input += num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    pos = this.input.toString().lastIndexOf('+');

    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('÷') > pos)
      pos = this.input.lastIndexOf('÷');

    return this.input.substring(pos + 1);
  }

  pressOperator(op: string) {
    // do not allow more than one operator
    const lastKey = this.input[this.input.length - 1];
    if (lastKey == '÷' || lastKey == '*' || lastKey == '-' || lastKey == '+') {
      return;
    }
    this.input += op;
    this.calcAnswer();
  }

  calcAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];

    if (lastKey == '.') {
      formula = formula.substring(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];
    if (lastKey == '/' || lastKey == '*' || lastKey == '-' || lastKey == '+') {
      formula = formula.substring(0, formula.length - 1);
    }
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == '0') this.input = '';
  }

  clear() {
    if (this.input != '') {
      this.input = this.input.substring(0, this.input.length - 1);
    }
  }

  allClear() {
    this.input = '';
    this.result = '';
  }
}
