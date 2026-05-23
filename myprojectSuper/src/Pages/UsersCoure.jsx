import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context/Context";

const UsersCourse = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const { courses } = useContext(Context);

  useEffect(() => {
    if (courses.length > 0) {
      const course = courses.find(item => item.id == id);
      setUsers(course ? course.users_where : []);
    }
  }, [courses, id]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (users.length === 0) {
    return <p className="text-center mt-3">No users found for this course.</p>;
  }

  return (
    <div className="table-responsive mt-3">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Last Lesson</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index)=> (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email || "-"}</td>
              <td>{user.last_lesson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersCourse;
