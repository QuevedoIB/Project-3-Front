import React, { Component } from 'react';
import './Report.scss';

export default class Report extends Component {

  state = {
    showBox: false,
  }

  onReportBox = () => {
    this.setState({
      showBox: !this.state.showBox,
    })
  }

  render() {
    return (<>
      <button id='report-button' onClick={this.onReportBox}><img src={process.env.PUBLIC_URL + '/images/report.png'} alt="report" /></button>
      {this.state.showBox && <div>
        <h4>Are you sure you want to report {this.props.username}?</h4>
        <button onClick={this.props.clickAction}>Report</button>
      </div>}
    </>
    )
  }
}
