import React, { Component } from 'react';
import './Report.scss';

export default class Report extends Component {

  state = {
    showBox: 'hide',
  }

  onReportBox = () => {
    if (this.state.showBox === 'hide') {
      this.setState({
        showBox: 'report-square',
      })
    } else {
      this.setState({
        showBox: 'hide',
      })
    }
  }

  render() {
    return (<>
      <button id='report-button' onClick={this.onReportBox}><img src={process.env.PUBLIC_URL + '/images/report.png'} alt="report" /></button>
      <div className={this.state.showBox}>
        <h4>Are you sure you want to report {this.props.username}?</h4>
        <button onClick={this.props.clickAction}>Report</button>
      </div>
    </>
    )
  }
}
