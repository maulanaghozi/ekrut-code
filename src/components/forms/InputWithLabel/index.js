import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Styles from "./styles.module.scss";

export const InputWithLabel = props => {
  const {
    label,
    styleContainer,
    disabled,
    value,
    setValue,
    placeholder,
    name,
  } = props;

  const handleChange = e => {
    if (e.target.name === name) {
      setValue(e.target.value);
    }
  };
  const renderInputText = () => {
    return (
      <div
        className={classNames(Styles.inputContainer, {
          [Styles.disabled]: disabled,
        })}
      >
        <input
          className={Styles.input}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          type={"text"}
        />
      </div>
    );
  };

  return (
    <div className={classNames(Styles.container, styleContainer)}>
      <span className={Styles.label}>{label}</span>
      {renderInputText()}
    </div>
  );
};

InputWithLabel.defaultProps = {
  label: "Label",
  styleContainer: {},
  disabled: false,
  value: "",
  placeholder: "input here ...",
  name: "",
};

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  styleContainer: PropTypes.any,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};
