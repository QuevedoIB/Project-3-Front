import React, { Component } from 'react';
import Messages from './Messages';
import '../components-scss/chat.scss';

class Chat extends Component {


    state = {
        message: "",
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <>
                <div>
                    <Messages chat={this.props.chat} contact={this.props.contact} />
                </div>
                <div className="send-content">
                    <form onSubmit={(e) => { e.preventDefault(); this.props.handleSendMessage(this.state.message); this.setState({ message: '', }) }} className="message-form">
                        <input className="button message-button" type="submit" value="Send" />
                        <input autoComplete="off" className="input message-input" placeholder="Write a message" type="text" name="message" onChange={this.handleChange} value={this.state.message} />
                    </form>
                </div>
            </>
        )
    }
}

export default Chat;