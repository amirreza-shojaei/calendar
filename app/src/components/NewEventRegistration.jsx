import React, { PureComponent } from "react";
import "../style/NewEventRegistration.css";
import { isValid } from "jalali-lib";
import AppContext from "../Contexts/AppContex";
class EventRegistration extends PureComponent {
  constructor(props) {
    super(props);
    this.category = [
      { id: "personal", value: "شخصی" },
      { id: "university", value: "دانشگاه" },
      { id: "work", value: "کار" },
    ];
  };
  static contextType=AppContext;

  state = {
    formInput: "",
    dateInput: "",
    todos:{key:null,title:null,year:null,month:null,day:null,type:null},
    category: "",
    error:""
  };
 
  formHandler = (e) => {
    e.preventDefault();
    const day= parseInt(this.state.dateInput.split('/')[2]);
    const month=parseInt(this.state.dateInput.split('/')[1]);
    const year=parseInt(this.state.dateInput.split('/')[0]);
    const valid =isValid(year,month,day);
    if(valid){
          this.setState((prevState) => ({
        todos:
          {
            key: Date.now(),
            title: prevState.formInput,
            type: prevState.category,
            day: parseInt(day),
            month:parseInt(month)-1,
            year:parseInt(year),
          },
        formInput: "",
        dateInput: "",
        category: "",
        error:""
    }),
    ()=>this.context.newEvent(this.state.todos)
  
  );
    }else{
      this.setState({error :"تاریخ نامعتبر است"});
    }
  };
  inputHandlerEvent = (e) => {
    this.setState({ formInput: e.target.value });
  };
  inputHandlerDate = (e) => {
    this.setState({ dateInput: e.target.value });
  };
  inputHandlerCheckbox = (e) => {
    this.setState({
      category:e.target.value
    });
  };

  render() {
    return (
      <div className="registration">
        <button onClick={()=>this.context.newEventBoolian(false)} className="close-button"><i className="fa-solid fa-xmark"></i></button>
        <h1 className="title">ثبت رویداد جدید</h1>
        <form className="form" onSubmit={this.formHandler}>
          <div>
            <input
              type="text"
              className="input-event"
              placeholder="چکاری میخوای انجام بدی؟..."
              value={this.state.formInput}
              onChange={this.inputHandlerEvent}
            />
          </div>
          <div>
            <input
              type="text"
              pattern="\d{4}\/(1[0-2]|[1-9])\/(3[01]|[12][0-9]|[1-9])"
              className="input-date"
              placeholder="تاریخ؟ (فرمت 1404/5/1)"
              value={this.state.dateInput}
              onChange={this.inputHandlerDate}
            />
            {this.state.error && <p className="error">{this.state.error}</p>}
          </div>
          <div>
            {this.category.map((category) => (
              <label key={category.id} className="category-label">
                <input
                  type="radio"
                  name="category"
                  className="category-checkbox"
                  value={category.id}
                  onChange={this.inputHandlerCheckbox}
                  checked={this.state.category.includes(category.id)}
                />
                {category.value}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            اضافه کردن
          </button>
        </form>
      </div>
    );
  }
}
export default EventRegistration;
