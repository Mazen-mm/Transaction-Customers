import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Home() {
    let [clients, setClients] = useState([]);
    let [filterClient, setFilterClient] = useState([]);
    let [transactions, setTransactions] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3300/customers')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched clients:', data);
          setClients(data);
          setFilterClient(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
      fetch('http://localhost:3300/transactions')
        .then(response => response.json())
        .then(data => {
          setTransactions(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    let search = (event) => {
      let searchVal = event.target.value.toLowerCase();
      if (searchVal) {
        let items = clients.filter(client => client.name.toLowerCase().includes(searchVal));
        setFilterClient(items);
      } 
      else {
        setFilterClient(clients);
      }
    };
  
    let options = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Customer Transactions Chart'
      },
      labels :['Ahmed Ali' , 'Aya ElSayed' , 'Mina Adel' , 'Sarah Reda' , 'Mohamed Sayed'],
      
      xAxis: {
        categories: ['0','1/1/2022','2/1/2022','Total Amount']
      },
      series: [
        {
          name: 'Ahmed Ali Amount',
          data: [0,1000,2000,3000]
        },
        {
          name: 'Aya ElSayed Amount',
          data: [0,550,1300,1850]
        },
        {
          name: 'Mina Adel Amount',
          data: [0,500,1250,1750]
        },
        {
          name: 'Sarah Reda Amount',
          data: [0,750,750]
        },
        {
          name: 'Mohamed Sayed Amount',
          data: [0,2500,875,3375]
        },
      ]
    };


  let totalAmount = transactions.filter(transaction => transaction.customer_id == 5 )
  .reduce((total, transaction) => total + transaction.amount, 0);
  console.log(`Total amount for customer_id : ${totalAmount}`);

  return  <>
    <div className="container w-75 m-auto">
      <h1 className='text-white text-center my-5'>Customers Data and Transaction Customers</h1>
      <input onKeyUp={search} id='searchInput' className="form-control me-2" type="search" placeholder="Search" 
      aria-label="Search" />
      
      <div className="row my-5">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Customer's Number</th>
              <th>Customer's Name</th>
              <th>Date</th>
              <th>Amout</th>
              <th>Total Amout</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(item => { 
              let client = filterClient.find(x => x.id == item.customer_id);
              return client ? (
                <tr key={item.id}>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{totalAmount}</td>
                </tr>
              ) : null;  
            })}
          </tbody>
        </table>
      </div>
      <div className='mb-5'><HighchartsReact highcharts={Highcharts} options={options} /></div>
    </div>
  </>
}
