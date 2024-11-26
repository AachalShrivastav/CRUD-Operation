import React, { useState } from "react";
import "./adduser/adduser.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddTeacher = () => {
  const teacherData = {
    name: "",
    email: "",
    subject: "",
  };
  const [teacher, setTeacher] = useState(teacherData);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("https://crud-operation-25kc.onrender.com/api/teacher", teacher)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/teachers");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addUser">
      <Link to="/teachers" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Teacher</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter teacher's name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter teacher's email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            onChange={inputHandler}
            name="subject"
            autoComplete="off"
            placeholder="Enter subject"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacher;
