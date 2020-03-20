import React from "react";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from "./AddOption";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("option");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (err) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("option", json);
    }
  }
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((element) => option !== element)
    }));
  };

  handlePick = () => {
    let randNum = Math.floor(Math.random() * this.state.options.length);
    let option = this.state.options[randNum];
    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleAddOption = (option) => {
    if (!option) {
      return "Enter a valid input";
    } else if (this.state.options.indexOf(option) > -1) {
      return "Option already here";
    }
    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };

  clearOptionModal = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  };

  render() {
    const subTitle = "Put your life in the hands of a computer";
    return (
      <div>
        <Header subTitle={subTitle} />
        <div className="container">
          <Action
            hasOption={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleRemoveAll={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          clearOptionModal={this.clearOptionModal}
        />
      </div>
    );
  }
}

export default IndecisionApp;
