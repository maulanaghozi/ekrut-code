import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./App.module.scss";
import { InputWithLabel } from "components/forms";
import { SET_EMAIL, SET_FULLNAME, SET_PHONE } from "store/types";
import {
  onSubmitBasicForm,
  changeStateUserId,
  onSubmitEduForm,
  onSubmitExperienceForm,
} from "store/actions/main";

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

  const dispatch = useDispatch();
  const basicInfo = useSelector(state => state.basicInformationReducer);
  const mainState = useSelector(state => state.mainReducer);
  const { fullname, phone, email } = basicInfo;

  const onHandleEditEdu = (newValue, id) => {
    const newEdu = educations.map(item => {
      if (item.id === id) {
        return { ...item, ...newValue };
      } else {
        return item;
      }
    });

    setEducations(newEdu);
  };

  const onHandleAddEducation = () => {
    const length = educations.length;
    setEducations([
      ...educations,
      {
        id: length + 1,
        school: "",
        major: "",
        user_id: mainState.userId,
      },
    ]);
  };

  const onDeleteEducation = id => {
    const rows = educations.filter(item => item.id !== id);
    setEducations(rows);
  };

  const onHandleEditExperience = (newValue, id) => {
    const newExperience = experiences.map(item => {
      if (item.id === id) {
        return { ...item, ...newValue };
      } else {
        return item;
      }
    });

    setEducations(newExperience);
  };

  const onHandleAddExperience = () => {
    const length = experiences.length;
    setExperiences([
      ...experiences,
      {
        id: length,
        company: "",
        title: "",
        user_id: mainState.userId,
      },
    ]);
  };

  const onDeleteExperience = id => {
    const rows = experiences.filter(item => item.id !== id);
    setExperiences(rows);
  };

  const onSubmit = async () => {
    const res = await dispatch(onSubmitBasicForm({ fullname, phone, email }));

    if (res.success) {
      dispatch(changeStateUserId(res.response.data.id));

      const dataEdu = educations.map(item => {
        delete item.id;
        item.user_id = res.response.data.id;

        return item;
      });

      const dataExp = experiences.map(item => {
        delete item.id;
        item.user_id = res.response.data.id;

        return item;
      });

      await dispatch(onSubmitEduForm(dataEdu));
      await dispatch(onSubmitExperienceForm(dataExp));
      alert("Submit berhasil!");
    } else {
      alert("Submit gagal!");
    }
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
            value={fullname}
            setValue={value =>
              dispatch({
                type: SET_FULLNAME,
                state: value,
              })
            }
            name={"fullname"}
            placeholder={"Enter your name"}
          />
          <InputWithLabel
            label={"Phone Number"}
            value={phone}
            setValue={value =>
              dispatch({
                type: SET_PHONE,
                state: value,
              })
            }
            name={"phone"}
            placeholder={"Enter your phone number"}
          />
          <InputWithLabel
            label={"Email"}
            value={email}
            setValue={value =>
              dispatch({
                type: SET_EMAIL,
                state: value,
              })
            }
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
                setValue={val => onHandleEditEdu({ school: val }, item.id)}
                name={"school"}
                placeholder={""}
              />
              <InputWithLabel
                styleContainer={classes.form}
                label={"Major"}
                value={item.major}
                setValue={val => onHandleEditEdu({ major: val }, item.id)}
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
                setValue={val =>
                  onHandleEditExperience({ company: val }, item.id)
                }
                name={"school"}
                placeholder={""}
              />
              <InputWithLabel
                styleContainer={classes.form}
                label={"Title"}
                value={item.title}
                setValue={val =>
                  onHandleEditExperience({ title: val }, item.id)
                }
                name={"title"}
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
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default App;
