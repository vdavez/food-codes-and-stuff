import React, { Component } from 'react'

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

    const filtered = data.filter(d => d['Main food description'].toLowerCase().includes(search))
    const food = data.filter(d => d['Food code'] === selected)[0]

    return (
      <div className='p3 container'>
        <input
          className='mb2 field'
          type='text'
          placeholder='Search'
          value={search}
          onChange={this.updateSearch}
        />

        <div className='mb2'>
          <div>Entries found: {filtered.length}</div>
          <div>Selected: {selected || 'N/A'}</div>
        </div>

        <div className='clearfix mxn1'>
          <div className='sm-col sm-col-7 px1'>
            <table className='table-light bg-white border rounded'>
              <thead className='bg-darken-1'>
                <tr><td>code</td><td>desc</td></tr>
              </thead>
              <tbody>
                {filtered.slice(0, 25).map((d, i) => (
                  <tr key={i}>
                    <td>
                      <a href='#!' onClick={this.pickFood}>{d['Food code']}</a>
                    </td>
                    <td>
                      {d['Main food description']}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {food &&
            <div className='sm-col sm-col-5 px1'>
              <table className='table-light bg-white border rounded'>
                <thead className='bg-darken-1'>
                  <tr><td>desc</td><td>weight</td></tr>
                </thead>
                <tbody>
                  {food.portions.map((d, i) => (
                    <tr key={i}>
                      <td>{d.desc}</td>
                      <td>{d.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App
