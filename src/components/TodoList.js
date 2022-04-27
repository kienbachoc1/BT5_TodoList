import React from "react";
import Todo from "./Todo";

export default function TodoList({
  todoList,
  onCheckBtnClick,
  onActiveBtnClick,
  onDeleteBtnClick,
}) {
  return (
    <>
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onCheckBtnClick={onCheckBtnClick}
          onActiveBtnClick={onActiveBtnClick}
        />
      ))}
    </>
  );
}
