import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useQuery } from "react-query";

const todosSlice = createSlice({
  //tạo slice
  name: "todoList",
  initialState: { status: "idle", todos: [] },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        // console.log({ action });
        state.todos = action.payload;
        state.status = "idle";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.todos.push(action.payload); // Thêm todo mới vào mảng todos trong state
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );

        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      });
  },
});

// get data
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const res = await axios.get("http://localhost:3001/todos");
    return res.data; // Trả về toàn bộ dữ liệu từ JSON Server
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});

//add data
export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (newTodo) => {
    try {
      const res = await axios.post("http://localhost:3001/todos", newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data; // Trả về dữ liệu todos từ server sau khi thêm mới
    } catch (error) {
      console.error("Error adding new todo:", error);
      throw error;
    }
  }
);

//update data

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/todos/${updatedTodo.id}`,
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data; // Trả về dữ liệu todos từ server sau khi cập nhật
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }
);

export default todosSlice;
