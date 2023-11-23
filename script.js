document.addEventListener('DOMContentLoaded', function() {
  const processBtn = document.querySelector('.btn-process');
  const clearBtn = document.querySelector('.btn-clear');

  processBtn.addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value.trim();
    const zipCode = document.getElementById('zipCode').value.trim();

    if (customerName && zipCode) {
      const invoiceNumber = generateInvoiceNumber(customerName, zipCode);
      calculateInvoiceDetails(invoiceNumber, customerName);
    } else {
      alert('Please fill in Customer Name and Zip Code.');
    }
  });

  clearBtn.addEventListener('click', function() {
    document.getElementById('orderForm').reset();
    document.getElementById('invoiceOutput').innerHTML = '';
  });

  function generateInvoiceNumber(customerName, zipCode) {
    const lastName = customerName.split(' ').pop().slice(0, 2).toUpperCase();
    const fourDigitZip = zipCode.slice(-4);
    return `${lastName}${fourDigitZip}`;
  }

  function calculateInvoiceDetails(invoiceNumber, customerName) {
    const workshopRates = {
      'Mobile App Development': { student: 3500, professional: 4500 },
      'Creative Web Design': { student: 2500, professional: 3000 },
      'R Programming with Data Science': { student: 5000, professional: 6500 }
    };

    const address = document.getElementById('address').value.trim();
    const studentMAD = parseInt(document.getElementById('studentMAD').value) || 0;
    const profMAD = parseInt(document.getElementById('profMAD').value) || 0;
    const studentCWD = parseInt(document.getElementById('studentCWD').value) || 0;
    const profCWD = parseInt(document.getElementById('profCWD').value) || 0;
    const studentR = parseInt(document.getElementById('studentR').value) || 0;
    const profR = parseInt(document.getElementById('profR').value) || 0;

    const outsideVenue = document.getElementById('outside').checked;
    const sourceCode = document.getElementById('sourceCode').checked;
    const certificates = document.getElementById('certificates').checked;
    const snacks = document.getElementById('snacks').checked;

    let venueCharge = outsideVenue ? 1000 : 0;
    let sourceCodeCharge = sourceCode ? 500 * (studentMAD + studentCWD + studentR + profMAD + profCWD + profR) : 0;
    let certificatesCharge = certificates ? 50 * (studentMAD + studentCWD + studentR + profMAD + profCWD + profR) : 0;
    let snacksCharge = snacks ? 150 * (studentMAD + studentCWD + studentR + profMAD + profCWD + profR) : 0;

    const totalMAD = (studentMAD * workshopRates['Mobile App Development'].student) +
      (profMAD * workshopRates['Mobile App Development'].professional);
    const totalCWD = (studentCWD * workshopRates['Creative Web Design'].student) +
      (profCWD * workshopRates['Creative Web Design'].professional);
    const totalR = (studentR * workshopRates['R Programming with Data Science'].student) +
      (profR * workshopRates['R Programming with Data Science'].professional);

    const totalAmount = totalCWD + totalMAD + totalR + venueCharge + sourceCodeCharge + certificatesCharge + snacksCharge;
    const vat = totalAmount * 0.12;
    const totalSales = totalAmount - vat;

    const invoiceContent = document.createElement('div');
    invoiceContent.innerHTML = `
      <p>Invoice Number: ${invoiceNumber}</p>
      <p>Name: ${customerName}</p>
      <p>Address: ${address}</p>
      <br>

      <p><strong>Mobile App Development</strong></p>
      <p>No. of Students: ${studentMAD}</p>
      <p>No. of Professional: ${profMAD}</p>
      <p>Subtotal: P${totalMAD}</p>

      <br>
      
      <p><strong>Creative Web Design</strong></p>
      <p>No. of Students: ${studentCWD}</p>
      <p>No. of Professional: ${profCWD}</p>
      <p>Subtotal: P${totalCWD}</p>

      <br>

      <p><strong>R Programming with Data Science</strong></p>
      <p>No. of Students: ${studentR}</p>
      <p>No. of Professional: ${profR}</p>
      <p>Subtotal: P${totalR}</p>

      <br>

      <p><strong>Inclusion</strong><p>
      <p>Source Code: P${sourceCodeCharge}</p>
      <p>Certificate: P${certificatesCharge}</p>
      <p>Snack: P${snacksCharge}</p>

      <br>

      <p>Venue: P${venueCharge}</p>

      <br>

      <p><strong>Total Sales: </strong> P${totalSales}</p>
      <p><strong>12% VAT: </strong> P${vat}</p>
      <p><strong>Total Amount Due: </strong> P${totalAmount}</p>
    `;

    const invoiceOutput = document.getElementById('invoiceOutput');
    invoiceOutput.innerHTML = '';
    invoiceOutput.appendChild(invoiceContent);
  }
});