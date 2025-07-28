import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  return (
    <div className="container">
      <div className="form-section">
        <InvoiceForm setInvoiceData={setInvoiceData} />
      </div>
      <div className="preview-section">
        {invoiceData && <InvoicePreview data={invoiceData} />}
      </div>
    </div>
  );
}

export default App;
