import React, { Component } from 'react';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: '',
      team: '',
      position: '',
      height: '',
      weight: '',
      classYear: '',
    };
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onLocalEditClick = this.onLocalEditClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPositionChange = this.onPositionChange.bind(this);
    this.onHeightChange = this.onHeightChange.bind(this);
    this.onWeightChange = this.onWeightChange.bind(this);
    this.onClassYearChange = this.onClassYearChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: this.props.user.name,
      team: this.props.team.name,
      position: this.props.user.position,
      height: this.props.user.height,
      weight: this.props.user.weight,
      classYear: this.props.user.classYear,
    });
  }
  onCancelClick(event) {
    this.setState({ isEditing: false });
  }
  onLocalEditClick(event) {
    this.setState({ isEditing: true });
  }
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }
  onPositionChange(event) {
    this.setState({ position: event.target.value });
  }
  onHeightChange(event) {
    this.setState({ height: event.target.value });
  }
  onWeightChange(event) {
    this.setState({ weight: event.target.value });
  }
  onClassYearChange(event) {
    this.setState({ classYear: event.target.value });
  }
  onSubmit(event) {
    const name = this.state.name;
    const position = this.state.position;
    const height = this.state.height;
    const weight = this.state.weight;
    const classYear = this.state.classYear;
    const userObject = {
      name, position, height, weight, classYear,
    };
    this.props.updateUser(this.props.user._id, userObject);
  }
  renderContent() {
    if (this.state.isEditing) {
      return (
        <form className="user-edit-form" onSubmit={this.onSubmit}>
          <div className="user-info-column">
            <div className="user-column-group">
              <ul>
                <li>
                  <div>Name</div>
                  <input onChange={this.onNameChange} value={this.state.name} type="text" />
                </li>
                <li>
                  <div>Height</div>
                  <input onChange={this.onHeightChange} value={this.state.height} type="text" />
                </li>
                <li>
                  <div>Year</div>
                  <input onChange={this.onClassYearChange} value={this.state.classYear} type="text" />
                </li>
              </ul>
              <ul>
                <li>
                  <div>Position</div>
                  <select value={this.state.position} onChange={this.onPositionChange}>
                    <option default value="None">Select</option>
                    <option value="Port">Port</option>
                    <option value="Starboard">Starboard</option>
                    <option value="Port/Starboard">Port/Starboard</option>
                    <option value="Coxswain">Coxswain</option>
                    <option value="Sculler">Sculler</option>
                  </select>
                </li>
                <li>
                  <div>Weight</div>
                  <input onChange={this.onWeightChange} value={this.state.weight} type="text" />
                </li>
                <button type="button" className="user-edit-cancel" onClick={this.onCancelClick}>Cancel</button>
                <button type="submit" className="user-edit-submit">Save</button>
              </ul>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <div className="user-info">
          <div className="user-info-column">
            <div className="user-description">
              <div className="user-name">{this.props.user.name}</div>
              <div className="team-name">{this.props.team.name}</div>
              <div className="user-column-group">
                <div className="user-info-column">
                  <div>Height: {this.props.user.height} in</div>
                  <div>Weight: {this.props.user.weight} lb</div>
                </div>
                <div className="user-info-column">
                  <div>Position: {this.props.user.position}</div>
                  <div>Year: {this.props.user.classYear}</div>
                </div>
              </div>
            </div>
            <div className="icon">
              <i onClick={this.onLocalEditClick} className="fa fa-pencil-square-o" />
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default UserInfo;
