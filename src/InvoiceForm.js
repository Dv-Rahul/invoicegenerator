import React, { useState } from 'react';

function InvoiceForm({ setInvoiceData }) {
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashier, setCashier] = useState('');
  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState([{ name: '', qty: 1, price: 0 }]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const addItem = () => setItems([...items, { name: '', qty: 1, price: 0 }]);

  const updateItem = (i, key, val) => {
    const updated = [...items];
    updated[i][key] = val;
    setItems(updated);
  };

  const deleteItem = (i) => {
    const updated = [...items];
    updated.splice(i, 1);
    setItems(updated);
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
    const discountAmount = (discount / 100) * subtotal;
    const taxAmount = (tax / 100) * (subtotal - discountAmount);
    const total = subtotal - discountAmount + taxAmount;
    return { subtotal, discountAmount, taxAmount, total };
  };

  const handleSubmit = () => {
    const totals = calculateTotals();
    setInvoiceData({
      date: new Date().toLocaleDateString(),
      invoiceNumber,
      cashier,
      customer,
      items,
      tax,
      discount,
      ...totals
    });
  };

  return (
    <div className="invoice-box">
      <p><b>Current Date:</b> {new Date().toLocaleDateString()}</p>
      <label>Invoice Number: </label>
      <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
      <h2>INVOICE</h2>

      <label>Cashier:</label>
      <input value={cashier} onChange={(e) => setCashier(e.target.value)} />
      <label>Customer:</label>
      <input value={customer} onChange={(e) => setCustomer(e.target.value)} />

      <table>
        <thead>
          <tr>
            <th>ITEM</th><th>QTY</th><th>PRICE</th><th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td><input value={item.name} onChange={e => updateItem(i, 'name', e.target.value)} /></td>
              <td><input type="number" value={item.qty} onChange={e => updateItem(i, 'qty', parseInt(e.target.value))} /></td>
              <td><input type="number" value={item.price} onChange={e => updateItem(i, 'price', parseFloat(e.target.value))} /></td>
              <td><button onClick={() => deleteItem(i)}>🗑️</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addItem} className="add-btn">Add Item</button>

      <div>
        <label>Tax rate: </label>
        <input type="number" value={tax} onChange={(e) => setTax(parseFloat(e.target.value))} />%
      </div>
      <div>
        <label>Discount rate: </label>
        <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value))} />%
      </div>

      <button className="review-btn" onClick={handleSubmit}>Review Invoice</button>
    </div>
  );
}

export default InvoiceForm;
