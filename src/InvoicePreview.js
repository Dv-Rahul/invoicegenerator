import React from 'react';

function InvoicePreview({ data }) {
  return (
    <div className="invoice-preview">
      <h2>Invoice Preview</h2>
      <p><b>Date:</b> {data.date}</p>
      <p><b>Invoice Number:</b> {data.invoiceNumber}</p>
      <p><b>Cashier:</b> {data.cashier}</p>
      <p><b>Customer:</b> {data.customer}</p>
      <hr />
      <table>
        <thead>
          <tr>
            <th>ITEM</th><th>QTY</th><th>PRICE</th><th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <p><b>Subtotal:</b> ${data.subtotal.toFixed(2)}</p>
      <p><b>Discount ({data.discount}%):</b> -${data.discountAmount.toFixed(2)}</p>
      <p><b>Tax ({data.tax}%):</b> +${data.taxAmount.toFixed(2)}</p>
      <p><b>Total:</b> <strong>${data.total.toFixed(2)}</strong></p>
    </div>
  );
}

export default InvoicePreview;
