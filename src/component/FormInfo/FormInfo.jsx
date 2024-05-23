import React, { useEffect, useState } from "react";
import { Form } from "../Form/Form";
import "./FormInfo.css";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash2,
  Type,
  X,
} from "react-feather";
import { Edititem } from "../Edititem/Edititem";

const FormInfo = (props) => {
  const colors = [
    "#C3F73A",
    "#95E06C",
    "#68B684",
    "#094D92",
    "#E54B4B",
    "#E0A458",
    "#6D5959",
  ];

  const [activeColor, setActiveColor] = useState("");
  const [show, setShow] = useState(true); // Changed initial state to true

  // const {title,labels,desc,date,tasks}=props.card
  //convert in object
  //object
  const [values, setValues] = useState({ ...props.card });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
  };

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };

  const addLabel = (label) => {
    if (!label.text || !label.color) return;
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setActiveColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
    console.log(values)
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
  };

  const removeTask = (id) => {
    const tasks = [...values.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    const tasks = [...values.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = value;

    setValues({
      ...values,
      tasks,
    });
  };

  const updateDate = (date) => {
    if (!date) return;

    setValues({
      ...values,
      date,
    });
  };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.boardId, values.id, values);
  }, [values]);

  return (
    <Form onClose={() => props.onClose()}>
      {show && (
        <div className="cardinfo">
          <div className="cardinfo_box">
            
            <div className="cardinfo_box_title">
              <Type /> Title
            </div>
            <div className="cardinfo_box_body">
              {/* <input type='text' placeholder='Enter Title' /> */}
              <Edititem
                defaultValue={values.title}
                text={values.title}
                placeholder="Enter Title"
                onSubmit={updateTitle}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <List /> Description
            </div>
            <div className="cardinfo_box_body">
              {/* <input type='text' placeholder='Enter Description' /> */}

              <Edititem
                defaultValue={values.desc}
                text={values.desc || "Add a Description"}
                placeholder="Enter description"
                onSubmit={updateDesc}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Calendar /> Date
            </div>
            <div className="cardinfo_box_body">
              <input
                type="date"
                defaultValue={values.date}
                min={new Date().toISOString().substr(0, 10)}
                onChange={(event) => updateDate(event.target.value)}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <Tag />
              <p>Labels</p>
            </div>
            <div className="cardinfo_box_labels">
              {values.labels.map((item, index) => (
                <label
                  key={index}
                  style={{ backgroundColor: item.color }}
                >
                  {item.text}
                  <X onClick={() => removeLabel(item)} />
                </label>
                
              ))}
            </div>
            <div className="cardinfo_box_colors">
              {colors.map((item, index) => (
                <li
                  key={index + item}
                  style={{ backgroundColor: item }}
                  className={activeColor === item ? "li_active" : ""}
                  onClick={() => setActiveColor(item)}
                />
              ))}
            </div>
            <div className="cardinfo_box_body">
              {/* <input type='text' placeholder='Enter Labels'/> */}
              
              <Edititem
                text="Add Label"
                placeholder="Enter label text"
                onSubmit={(value) => {
                  addLabel({ color: activeColor, text: value })
                  // console.log(value);
                }}
              />
            </div>
          </div>

          <div className="cardinfo_box">
            <div className="cardinfo_box_title">
              <CheckSquare />
                <p>Tasks</p>
            </div>
            <div className="cardinfo_box_progressbar">
              <div
                className="cardinfo_box_progress"
                style={{ width: calculatePercent() + "%",
                    backgroundColor: calculatePercent() === 100 ? "limegreen" : "",
                 }}
              ></div>
            </div>
            <div className="cardinfo_box_boxlist">
            {values.tasks?.map((item) => (
              <div key={item.id} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash2 onClick={() => removeTask(item.id)} />
              </div>
            ))}
            </div>
            <div className="cardinfo_box_body">
              <Edititem
                text={"Add a Task"}
                placeholder="Enter task"
                onSubmit={addTask}
              />
            </div>
          </div>
        </div>
      )}
    </Form>
  );
};

export default FormInfo;
