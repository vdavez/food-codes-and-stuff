import React, { Component } from 'react'

class WeightForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedWeight: Number(this.props.food.portions[0].weight),
      selectedAmount: null,
      totalWeight: null
    }
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleWeightChange(event) {
    this.setState({
      selectedWeight: Number(event.target.value),
      totalWeight: Number(event.target.value) * this.state.selectedAmount
    });
  }

  handleAmountChange(event) {
    this.setState({
      selectedAmount: Number(event.target.value),
      totalWeight: Number(event.target.value) * this.state.selectedWeight
    });
  }


  render() {
    const food = this.props.food;
    return (

      <div className='sm-col sm-col-5 px1'>

        <form id='weightForm' className="col-12">
        <legend><strong>{food["Main food description"]}</strong></legend>
        <label>Select Measurement Type</label>
        <select className="block col-12 field" name="selectedWeight" onChange={this.handleWeightChange}>
        {
          food.portions.map((d, i) => (
            <option value={Number(d.weight)}>{d.desc}</option>
          ))
        }
        </select>
        <label>Amount of the measurement</label>
        <input type="number" className="block col-12 field" name="selectedAmount" value={this.state.selectedAmount} onChange={this.handleAmountChange}/>
        </form>

        <h2>Results</h2>
        <table className="table-light"><thead className="bg-darken-1"><th>Food Code</th><th> Weight in Grams</th></thead>
        <tbody><tr><td>{food["Food code"]}</td><td>{this.state.totalWeight}</td></tr></tbody>
        </table>
      </div>
    )
  }
}

export default WeightForm
