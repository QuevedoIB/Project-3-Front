import React, { Component } from 'react';
import socketManager from '../../socketManager';

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
            <div>
                <form onSubmit={(e)=> {e.preventDefault(); this.props.handleSendMessage(this.state.message)}} className="message-form">
                    <input autoComplete="off" className="input message-input" placeholder="Write a message" type="text" name="message" onChange={this.handleChange} value={this.state.message} />
                    <input className="button message-button" type="submit" value="Send" />
                </form>
            </div>
        )
    }
}

export default Chat;