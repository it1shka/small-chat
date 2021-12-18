import React from 'react'
import Chat from './Chat'
import MessageForm from './MessageForm'
import { io } from 'socket.io-client'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.receiveMessage = this.receiveMessage.bind(this)
  }

  componentDidMount() {
    this.socket = io('http://localhost:5050', {
      transports: ['websocket']
    })
    this.socket.on('message', this.receiveMessage)
  }

  componentWillUnmount() {
    this.socket.close()
  }

  sendMessage(message) {
    const newMessage = {
      content: message,
      mine: true
    }
    this.socket.emit('message', message)
    this.setState(prev => ({
      messages: [...prev.messages, newMessage]
    }))
  }

  receiveMessage(message) {
    const newMessage = {
      content: message,
      mine: false
    }
    this.setState(prev => ({
      messages: [...prev.messages, newMessage]
    }))
  }

  render() {
    return (
      <div className='container'>
        <header className='header'>
          <h1>Global Chat</h1>
        </header>

        <div className='chat-container'>
          <Chat messages={this.state.messages}/>
          <MessageForm sendMessage={this.sendMessage}/>
        </div>
      </div>
    )
  }
}