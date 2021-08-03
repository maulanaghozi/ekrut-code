import React, { useState } from "react";
import classes from "./App.module.scss";
import { InputWithLabel } from "components/forms";

function App() {
  const [educations, setEducations] = useState([
    {
      id: 1,
      school: "",
      major: "",
    },
  ]);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "",
      title: "",
    },
  ]);

  const onHandleAddEducation = () => {
    const length = educations.length;
    setEducations([
      ...educations,
      {
        id: length + 1,
        school: "",
        major: "",
      },
    ]);
  };

  const onDeleteEducation = id => {
    const rows = educations.filter(item => item.id !== id);
    setEducations(rows);
  };

  const onHandleAddExperience = () => {
    const length = experiences.length;
    setExperiences([
      ...experiences,
      {
        id: length,
        company: "",
        title: "",
      },
    ]);
  };

  const onDeleteExperience = id => {
    const rows = experiences.filter(item => item.id !== id);
    setExperiences(rows);
  };

  return (
    <div className={classes.container}>
      <section>
        <header>
          <h2>BASIC INFORMATION</h2>
        </header>
        <div className={classes.formBasic}>
          <InputWithLabel
            label={"Full Name"}
            value={""}
            setValue={() => {}}
            name={"fullname"}
            placeholder={"Enter your name"}
          />
          <InputWithLabel
            label={"Phone Number"}
            value={""}
            setValue={() => {}}
            name={"phone"}
            placeholder={"Enter your phone number"}
          />
          <InputWithLabel
            label={"Email"}
            value={""}
            setValue={() => {}}
            name={"email"}
            placeholder={"Enter your email"}
          />
        </div>
      </section>
      <section>
        <header>
          <h2>EDUCATION</h2>
        </header>
        {Array.isArray(educations) &&
          educations.map((item, idx) => (
            <div className={classes.formEdu} key={idx.toString()}>
              <InputWithLabel
                styleContainer={classes.form}
                label={"School"}
                value={item.school}
                setValue={() => {}}
                name={"school"}
                placeholder={""}
              />
              <InputWithLabel
                styleContainer={classes.form}
                label={"Major"}
                value={item.major}
                setValue={() => {}}
                name={"major"}
                placeholder={""}
              />
              {idx !== 0 && idx === educations.length - 1 && (
                <button onClick={() => onDeleteEducation(item.id)}>
                  Delete
                </button>
              )}
            </div>
          ))}

        <button className={classes.btnAdd} onClick={onHandleAddEducation}>
          Add New
        </button>
      </section>
      <section>
        <header>
          <h2>EXPERIENCE</h2>
        </header>
        {Array.isArray(experiences) &&
          experiences.map((item, idx) => (
            <div className={classes.formEdu} key={idx.toString()}>
              <InputWithLabel
                styleContainer={classes.form}
                label={"Company"}
                value={item.company}
                setValue={() => {}}
                name={"school"}
                placeholder={""}
              />
              <InputWithLabel
                styleContainer={classes.form}
                label={"Title"}
                value={item.title}
                setValue={() => {}}
                name={"major"}
                placeholder={""}
              />
              {idx !== 0 && idx === experiences.length - 1 && (
                <button onClick={() => onDeleteExperience(item.id)}>
                  Delete
                </button>
              )}
            </div>
          ))}

        <button className={classes.btnAdd} onClick={onHandleAddExperience}>
          Add New
        </button>
      </section>
      <button>Submit</button>
    </div>
  );
}

export default App;
