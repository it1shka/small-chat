import React from 'react'

export default class Chat extends React.Component {
  render() {
    return (
      <ul className='chat'>
        {this.props.messages.map( (message, i) => {
          return <Message message={message} key={i}/>
        })}

        <div style={{ float:"left", clear: "both" }} 
          ref={element => {this.messagesEnd = element}}>
        </div>
      </ul>
    )
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({behavior: 'smooth'})
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }
}

function Message({message}) {
  const {content, mine} = message
  const style = (
    mine 
      ? { 
          marginLeft: 'auto', 
          backgroundColor: 'var(--light-primary)' 
        }
      : undefined
  )
  return (
    <li className='message'>
      <span style={style}>{content}</span>
    </li>
  )
}