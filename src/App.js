import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";

// const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [active, setActive] = useState(false);

  // useEffect(() => {
  //   const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
  //   if (storagedTodoList) {
  //     setTodoList(JSON.parse(storagedTodoList));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  // }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      // them text input vao danh sach todoList
      if (!textInput || !textInput.trim()) {
        return;
      }
      setTodoList([
        {
          id: v4(),
          name: textInput.trim(),
          isCompleted: false,
          isActive: false,
        },
        ...todoList,
      ]);

      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  const onActiveBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id && !todo.isActive
          ? { ...todo, isActive: true }
          : { ...todo, isActive: false }
      )
    );
  }, []);

  const onDeleteBtnClick = useCallback(() => {
    let cofirmAction = window.confirm("Bạn có muốn xóa todo ?");
    if (cofirmAction) {
      setTodoList(todoList.filter((todo) => !todo.isActive));
    }
  }, [todoList]);

  const onUpDateBtnClick = useCallback(() => {
    try {
      let result = todoList.find((todo) => todo.isActive);
      setTextInput(result.name.trim());
      if (textInput !== "") {
        setTodoList((prevState) =>
          prevState.map((todo) =>
            todo.id === result.id ? { ...todo, name: textInput } : todo
          )
        );
        setTextInput("");
      }
    } catch (error) {
      alert("Hãy chọn todo cần sữa");
      console.log(error);
    }
  }, [todoList, textInput]);

  return (
    <div>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm..."
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <Button appearance="primary" onClick={onAddBtnClick}>
        Thêm
      </Button>
      <Button appearance="danger" onClick={onDeleteBtnClick}>
        Xóa
      </Button>
      <Button appearance="warning" onClick={onUpDateBtnClick}>
        Sữa
      </Button>
      <TodoList
        todoList={todoList}
        onCheckBtnClick={onCheckBtnClick}
        onActiveBtnClick={onActiveBtnClick}
      />
    </div>
  );
}

export default App;
