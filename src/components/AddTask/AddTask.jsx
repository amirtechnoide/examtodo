import { motion } from "framer-motion";
import TaskContext from "../context/TaskContext";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from 'react-date-picker';
import { format } from 'date-fns'
import "react-toastify/dist/ReactToastify.css";
import "./AddTask.css";
const AddTask = () => {
  const { addTasks } = useContext(TaskContext);
  const [text, setText] = useState({ topic: "", content: "" });
  const handleTopic = (e) => {
    setText({ ...text, topic: e.target.value });
  };
  const handleContent = (e) => {
    setText({ ...text, content: e.target.value });
  };
  const minDateTime = new Date()
  const formatDate = valueDate =>
  format(valueDate, `DD/MM/YYYY`)
  //Handle date
  const [valueDate, setDate] = useState(new Date().toDateString());
  const handleChangeDate = date => {
    setDate(date)
   }

  //Handle date
  const handleSubmit = (e) => {
  console.log(valueDate.getDay)

    e.preventDefault();
    setText({ topic: "", content: "",date:"" });
    if (text.topic.trim() !== "" && text.content.trim() !== "" && valueDate !=="") {
      addTasks(text.topic, text.content,valueDate);
    } else {
      errorMessage();
    }
  };
  const errorMessage = () => {
    toast.error("Please fill the following form");
  };
  return (
    <div className="add-task">
      <ToastContainer />
      <div className="add-task__title">
        <img
          className="add-task__title__icon"
          src="./svg/add-task.svg"
          alt=""
        />
        <h2 className="add-task__title__text">Make New Task</h2>
      </div>
      <form onSubmit={handleSubmit} className="add-task__inputs">
        <div>
          <p className="add-task__lether-count">{text.topic.length}/50</p>
          <input
            maxLength={50}
            value={text.topic}
            onChange={handleTopic}
            className="input add-task__inputs__name"
            type="text"
            placeholder="Activity name"
          />
        </div>
        <div>
          <p className="add-task__lether-count">{text.content.length}/200</p>
          <textarea
            maxLength={200}
            value={text.content}
            onChange={handleContent}
            className="input add-task__inputs__content"
            type="text"
            placeholder="more info about your activity"
          />
        </div>
        <div>
          <p className="add-task__lether-count">Date</p>
          <DatePicker className="datepicker_style" onChange={handleChangeDate} formatDate={formatDate} minDate={minDateTime} value={valueDate} />
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          className="add-task__inputs__submit"
        >
          Create New Task
        </motion.button>
      </form>
    </div>
  );
};
console.log('I was triggered during render')
export default AddTask;
