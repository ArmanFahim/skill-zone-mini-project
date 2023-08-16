import "./styles.css";
import { useReducer } from "react";

export default function App() {
  let initialState = [
    {
      id: 1,
      student_name: "arman",
      reg_no: 101,
      dept: "maths",
      suspend: false
    },
    {
      id: 2,
      student_name: "Sundar",
      reg_no: 102,
      dept: "physics",
      suspend: false
    },
    {
      id: 3,
      student_name: "leela",
      reg_no: 103,
      dept: "chemistry",
      suspend: false
    }
  ];
  const reducer = (state, action) => {
    let newState;

    switch (action.type) {
      case "ADD_STUDENT":
        let newStudent = {
          id: state.length + 1,
          student_name: "arjun",
          reg_no: 100 + state.length + 1,
          dept: "botany",
          suspend: false
        };

        newState = [...state, newStudent];
        return newState;
      case "REMOVE_STUDENT":
        newState = state.filter((std) => std.id != action.id);
        return newState;
      case "SUSPEND":
        let suspendedStd = state.filter((std) => std.id == action.id);
        newState = [...state, { suspendedStd, suspend: true }];
        return newState;
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const addStudent = () => {
    dispatch({ type: "ADD_STUDENT" });
  };
  return (
    <>
      <button onClick={addStudent}>Add student</button>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {state.map((student) => {
          return (
            <div
              key={student.id}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: `${student?.suspend ? "red" : "yellow"}`,
                margin: "10px",
                justifyContent: "center",
                alignContent: "space-evenly",
                padding: "10px",
                width: "100px"
              }}
            >
              <label>{student.id}</label>
              <h5>{student.student_name}</h5>
              <h6>Reg: {student.reg_no}</h6>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_STUDENT", id: student.id })
                }
              >
                Remove
              </button>
              <button
                onClick={() => dispatch({ type: "SUSPEND", id: student.id })}
              >
                suspended
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
