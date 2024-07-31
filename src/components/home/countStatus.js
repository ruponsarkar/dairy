import React, { useEffect, useState } from "react";
import api from "../../API/api";

const CountStatus = () => {
  // countStatus

  const [count, setCount] = useState();

  useEffect(() => {
    api
      .countStatus()
      .then((res) => {
        console.log("count: ", res.data.message);
        setCount(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
    {count &&
      <div class="row text-center">
        <div class="col-md-3 p-1">
          <div class="counter">
            <i class="fa fa-file fa-2x"></i>
            <h2 class="timer count-title count-number">{count.total}</h2>
            <p class="count-text ">Total Applied</p>
          </div>
        </div>
        <div class="col-md-3 p-1">
          <div class="counter">
            <i class="fa fa-check fa-2x"></i>
            <h2 class="timer count-title count-number">{count.approve}</h2>
            <p class="count-text ">Approved</p>
          </div>
        </div>
        <div class="col-md-3 p-1">
          <div class="counter">
            <i class="fa fa-plus fa-2x"></i>
            <h2 class="timer count-title count-number">{count.draft} / {count.incompleted}</h2>
            <p class="count-text ">Draft / Incompleted</p>
          </div>
        </div>
        {/* <div class="col-md-3 p-1">
          <div class="counter">
            <i class="fa fa-inr fa-2x"></i>
            <h2 class="timer count-title count-number">{count.incompleted}</h2>
            <p class="count-text ">Incompleted</p>
          </div>
        </div> */}
        <div class="col-md-3 p-1">
          <div class="counter">
            <i class="fa fa-refresh fa-2x"></i>
            <h2 class="timer count-title count-number">{count.rejected}</h2>
            <p class="count-text ">Rejected</p>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default CountStatus;
