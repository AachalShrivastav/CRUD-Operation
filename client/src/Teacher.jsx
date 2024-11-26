import React, { useEffect, useState } from "react";
// import "./getuser/css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://crud-operation-25kc.onrender.com/api/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteTeacher = async (teacherId) => {
    await axios
      .delete(`https://crud-operation-25kc.onrender.com/api/delete/teacher/${teacherId}`)
      .then((response) => {
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher._id !== teacherId)
        );
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="teacherTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add Teacher <i className="fa-solid fa-user-plus"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Subject</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher._id}>
              <td>{index + 1}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.subject}</td>
              <td className="actionButtons">
                <Link
                  to={`/update/teacher/` + teacher._id}
                  type="button"
                  className="btn btn-info"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button
                  onClick={() => deleteTeacher(teacher._id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teacher;
