import React, { useEffect, useState } from 'react'

export default function Home() {

    let [clients, setClients] = useState([]);
    let [filterClient, setFilterClient] = useState([]);
    let [transactions, setTransactions] = useState([]);


    useEffect(() => {
      fetch('http://localhost:3300/customers')
        .then(response => response.json())
        .then(data => {
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

    function search(data) {
      let searchVal = data.target.value.toLowerCase();
      if (searchVal) {
        let items = clients.filter(client => client.name.toLowerCase().includes(searchVal));
        console.log(items);
        setFilterClient(items);
      } else {
        setFilterClient(clients);
      }
    }
    // trans.name.toLowerCase().includes(searchVal)

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
            </tr>
          </thead>
          <tbody>
            {transactions.map(item => {
              const client = filterClient.find(x => x.id == item.customer_id);
              return client ? (
                <tr key={item.id}>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                </tr>
              ) : null;  
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>
}
