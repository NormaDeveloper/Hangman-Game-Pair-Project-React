const Form =(props)=>{
    const handleSubmit = (event) => {
        event.preventDefault();
      };
    return(
        <form className="form" onSubmit={handleSubmit}>
        <label className="title" htmlFor="last-letter">
          Escribe una letra:
        </label>
        <input
          autoComplete="off"
          className="form__input"
          maxLength="1"
          type="text"
          name="last-letter"
          id="last-letter"
          onChange={props.handleChangeLetter}
          value={props.lastLetter}
        />
      </form>
    )
}

export default Form;