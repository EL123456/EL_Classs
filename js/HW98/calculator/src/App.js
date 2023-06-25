import { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    current: '0',
    total: '0',
    isEqualSign: false
  }

  handleInput = e => {
    this.setState({
      current: e.target.value
    })
  }

  async handleClick(btn) {
    switch(btn) {
      case '+':
      case '-':
      case '*':
      case '/':
        if(this.state.isEqualSign) {
          this.setState({
            isEqualSign: false
          })
        }
        if(this.state.operator) {
          await this.calculate();
          this.setState({
            last: this.state.current,
            current: '',
            operator: btn
          })
        } else {
          this.setState({
            total: this.state.current,
            last: this.state.current,
            current: '',
            operator: btn
          });
        }
        
        break;
      case '=':
        this.setState({
          isEqualSign: true
        })
        this.calculate();
        break;
      case 'C':
        this.setState({
          total: '0',
          last: '',
          current: '0',
          operator: ''
        })
        break;
      case '.':
        //this is right before default bcuz it doesn't have 'break;'
        if(this.state.current.includes('.')) {
          break;
        }
      // eslint-disable-next-line no-fallthrough
      default:
        if(this.state.isEqualSign) {
          this.setState({
            total: '0',
            current: btn.toString(),
            last: '',
            isEqualSign: false
          })
        } else {
          this.setState({
            current: this.state.current !== '0' ? this.state.current + btn : btn.toString()
          })
        }
        
        break;
    }
  }

  calculate() {
    const left = +this.state.last;
    const right = +this.state.current;
    let answer;

    switch(this.state.operator) {
      case '+':
        answer = left + right;
        break;
      case '-':
        answer = left - right;
        break;
      case '*':
        answer = left * right;
        break;
      case '/':
        answer = left / right;
        break;
      default:
        console.log('invalid calculation');
        break;
    }

    this.setState({
      total: answer,
      current: answer,
      last: '',
      operator: ''
    })
  }

  render() {
    return(
      <div id='calculator'>
        <div id='inputs'>
          <label id='total_screen'>
            <span>Total: </span>
            <input  value={this.state.total} readOnly/>
          </label>
          <label id='value_screen'>
            <input id='operator_screen' value={this.state.operator} readOnly/>
            <input id='current_screen' value={this.state.current} onChange={this.handleInput} readOnly/>
          </label>
        </div>
        
        {/* see how layout turns out...may change this */}
        <div id='buttons'>
        {
          [1,2,3,'+',4,5,6,'-',7,8,9,'*','C',0,'.','/','='].map(n => <button className='button' key={n} onClick={() => this.handleClick(n)}>{n}</button>)
        }
        </div>
        
      </div>
    );
  }
}

export default App;
