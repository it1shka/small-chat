import React from 'react'

export default class MessageForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }

    this.sendMessageMock = message => {
      console.log(message)
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleInputChange(e) {
    const message = e.target.value
    this.setState({ message })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    const msg = this.state.message;
    if(!msg) return 
    (this.props.sendMessage || this.sendMessageMock)(msg)
    this.setState({ message: '' })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className='message-form'>
        <input required value={this.state.message} onChange={this.handleInputChange} placeholder='Type smth...'/>
        <button className='pretty-btn'>Send</button>
      </form>
    )
  }
}