import React, { useEffect, useState } from "react";
import '../Overview.css';

const Overview = () => {
  const [turnover, setTurnover] = useState(0);
  const [profit, setProfit] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        const totalTurnover = data.reduce(
          (acc, item) => acc + parseFloat(item.value.replace("$", "").replace(",", "")), 
          0
        );
        setTurnover(totalTurnover);
        setProfit(totalTurnover * 0.35); 
        setCustomers(data.length); 
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="overview-container">
      <div className="tieude">
        <img src="/src/img/Squares four 1.png" alt="" width="25" height="25" />
        <h4 className="title">Overview</h4>
      </div>
      <div className="overview-grid">
        <div className="card card-turnover">
          <div className="card-header">
            <div>
              <p className="card-title">Turnover</p>
              <h3 className="card-value">${turnover.toLocaleString()}</h3>
            </div>
            <span className="card-icon-box text-pink-500"></span>
          </div>
          <p className="card-change">▲ 5.39% period of change</p>
        </div>

        <div className="card card-profit">
          <div className="card-header">
            <div>
              <p className="card-title">Profit</p>
              <h3 className="card-value">${profit.toLocaleString()}</h3>
            </div>
            <span className="card-icon-box text-blue-500"></span>
          </div>
          <p className="card-change">▲ 5.39% period of change</p>
        </div>

        <div className="card card-customers">
          <div className="card-header">
            <div>
              <p className="card-title">New customer</p>
              <h3 className="card-value">{customers}</h3>
            </div>
            <span className="card-icon-box text-blue-500"></span>
          </div>
          <p className="card-change">▲ 6.84% period of change</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
