import React, { Component } from 'react'
import WeightForm from './WeightForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      search: '',
      selected: null,
      isFetching: true,

    }
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then(response => response.json())
      .then(data => this.setState({ data: data, isFetching: false }))
  }

  updateSearch = e => {
    this.setState({ search: e.target.value })
  }

  pickFood = e => {
    this.setState({ selected: Number(e.target.text) })
  }

  render() {
    const { data, search, selected, isFetching } = this.state
    if (isFetching) return <div>Loading...</div>

    const filtered = data.filter(d =>{
      var main_desc = d['Main food description'].toLowerCase();
      return main_desc.includes(search) || d['Food code'].toString().includes(search)
    })
    const food = data.filter(d => d['Food code'] === selected)[0]

    return (
      <div className="p1">
        <h1>Find the Food Code and Weight in Grams</h1>

        <div>
          <div className='clearfix mxn1'>
            <div className='sm-col sm-col-7 px1'>
            <p>Instructions:
            <ul><li>Search for a food by key word</li>
            <li>Click on the code that corresponds best</li>
            <li>Select the measurement type (e.g., <em>1 Cup</em> or <em>1 oz</em>)</li>
            <li>Type in the number of servings (e.g., <em>0.5</em> or <em>1</em>)</li>
            <li>Get the food code and weight in grams</li></ul>
            </p>
            <input
              className='mb2 field'
              type='text'
              placeholder='Search (ex. orange)'
              value={search}
              onChange={this.updateSearch}
            />

              <table className='table-light bg-white border rounded'>
                <thead className='bg-darken-1'>
                  <tr><td>code</td><td>desc</td><td>additional</td></tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 25)
                     .sort((a, b) => {
                       return (a['Main food description'].toLowerCase().indexOf(search) >= b['Main food description'].toLowerCase().indexOf(search) ? 1 : -1)})
                      .map((d, i) => (
                    <tr key={i}>
                      <td>
                        <a href='#!' onClick={this.pickFood}>{d['Food code']}</a>
                      </td>
                      <td>
                        {d['Main food description']}
                      </td>
                      <td>
                        {d['additional'].join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {food && <WeightForm food={food}/> }
          </div>
        </div>
      </div>
    )
  }
}

export default App
