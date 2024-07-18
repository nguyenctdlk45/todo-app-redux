import { Row, Tag, Checkbox } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { toggleTodoStatus } from '../../redux/actions';
import todoListSlice, { updateTodo } from "../TodoList/todosSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ todo }) {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(todo.completed);

  const toggleCheckbox = () => {
    setChecked(!checked);
    const updatedTodo = {
      ...todo,
      completed: !checked,
    };

    dispatch(updateTodo(updatedTodo));
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {todo.name}
      </Checkbox>
      <Tag color={priorityColorMapping[todo.priority]} style={{ margin: 0 }}>
        {todo.priority}
      </Tag>
    </Row>
  );
}
