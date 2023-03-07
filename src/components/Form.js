function Form() {
  return (
    <div className="form-content">
      <form>
        <label htmlFor="task">
          Add Task
          <input type="text" id="task" />
        </label>

        <label htmlFor="time">
          Add Time
          <input type="text" id="time" />
        </label>
      </form>
    </div>
  );
}

export default Form;
