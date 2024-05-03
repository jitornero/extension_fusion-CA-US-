
const htmlLang = document.querySelector("html");
const country = htmlLang.getAttribute('lang');

if (country =="en-CA"){

  function ejecutar() {
    // Specify the element containing tables and h3 tags - Dentro de estos estan tanto imperial como metric units
    let specsContainer = document.querySelector('.fgx-brand-accordion-item:nth-child(2)');
  
    // Get the document title
    let title = document.title;
  
    // Select all tables within the specified element
    const tables = specsContainer.querySelectorAll('table');
  
    // Initialize empty arrays to store combined data for metric and imperial units
    const combinedDataMetric = [];
    const combinedDataImperial = [];
  
    // Iterate through each table
    tables.forEach((table) => {
      // Get the unit type (metric or imperial) from the table's data-fd-spec-unit attribute
      const unitType = table.getAttribute('data-fd-spec-unit');
  
      // Initialize an empty array for each table
      let combinedData = null;
  
      // Determine the combined data array based on the unit type
      if (unitType === 'metric') {
        combinedData = combinedDataMetric;
      } else if (unitType === 'imperial') {
        combinedData = combinedDataImperial;
      }
  
      // Add a separator row to combinedData
      combinedData.push(['--------------------------------------------------------------------------------------------------']);
  
      // Iterate through each row in the table
      table.querySelectorAll('tr').forEach((row, rowIndex) => {
        // Initialize an empty array for each row
        const rowData = [];
  
        // Iterate through each cell in the row
        row.querySelectorAll('td, th').forEach((cell, cellIndex) => {
          // Push the text content of the cell to the row array
          rowData.push(cell.textContent.trim());
        });
  
        // Push the row data to the combined data array
        combinedData.push(rowData);
      });
    });
  
    // Convert the combined data to CSV strings
    const csvLinesMetric = convertToCSV(combinedDataMetric);
    const csvLinesImperial = convertToCSV(combinedDataImperial);
  
    // Join the CSV lines into CSV strings
    const csvContentMetric = "\uFEFF" + csvLinesMetric.join('\r\n');
    const csvContentImperial = "\uFEFF" + csvLinesImperial.join('\r\n');
  
    // Generate download links for the CSV files
    const csvBlobMetric = new Blob([csvContentMetric], { type: 'text/csv;charset=utf-8;' });
    const csvUrlMetric = URL.createObjectURL(csvBlobMetric);
  
    const csvBlobImperial = new Blob([csvContentImperial], { type: 'text/csv;charset=utf-8;' });
    const csvUrlImperial = URL.createObjectURL(csvBlobImperial);
  
    // Create download links and trigger the click events
    createDownloadLink(csvUrlMetric, `SPECS - Metric Units - ${title}.csv`);
    createDownloadLink(csvUrlImperial, `SPECS - Imperial Units - ${title}.csv`);
  }
  
  // Function to convert combined data to CSV format
  function convertToCSV(combinedData) {
    return combinedData.map(rowData => {
      // Escape double quotes within the values and join the row array into a CSV line
      const escapedRowArray = rowData.map(value => {
        return '"' + value.replace(/"/g, '""') + '"';
      });
      return escapedRowArray.join(';');
    });
  }
  
  // Function to create and trigger download links
  function createDownloadLink(csvUrl, fileName) {
    const downloadLink = document.createElement('a');
    downloadLink.href = csvUrl;
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  // Call the function
  ejecutar();

}

else {
  function ejecutar() {
    // Specify the element containing tables and h3 tags
    let specsContainer = document.querySelector('.fgx-brand-accordion-item:nth-child(2)');
  
    // Get the document title
    let title = document.title;
  
    // Select all tables and h3 tags within the specified element
    const elements = specsContainer.querySelectorAll('h3, table');
  
    // Initialize an empty array to store the combined data
    const combinedData = [];
  
    let currentH3 = null; // Variable to store the current h3 tag
  
    // Iterate through each element
    elements.forEach((element) => {
      if (element.tagName === 'H3') {
        // If the element is an h3 tag, update the currentH3 variable
        currentH3 = element.textContent.trim();
        // Add the current h3 tag and the separator value in separate columns
        combinedData.push([currentH3, '--------------------------------------------------------------------------------------------------']);
      } else if (element.tagName === 'TABLE') {
        // If the element is a table, process it
        // Iterate through each row in the table
        element.querySelectorAll('tr').forEach((row, rowIndex) => {
          // Initialize an empty array for each row
          const rowData = [];
  
          // Iterate through each cell in the row
          row.querySelectorAll('td, th').forEach((cell, cellIndex) => {
            // Push the text content of the cell to the row array
            rowData.push(cell.textContent.trim());
          });
  
          // Push the row data to the combined data array
          combinedData.push(rowData);
        });
  
        // Add a separator row after the table rows
        combinedData.push(['--------------------------------------------------------------------------------------------------']); // One row with dashes
      }
    });
  console.log(combinedData);
    // Convert the combined data to a CSV string
    const csvLines = combinedData.map(rowData => {
      // Escape double quotes within the values and join the row array into a CSV line
      const escapedRowArray = rowData.map(value => {
        return '"' + value.replace(/"/g, '""') + '"';
      });
      return escapedRowArray.join(';');
    });
  
    // Join the CSV lines into a single CSV string
    const csvContent = "\uFEFF" + csvLines.join('\r\n');
  
    // Generate a download link for the CSV file
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
  
    // Create a download link and trigger the click event
    const downloadLink = document.createElement('a');
    downloadLink.href = csvUrl;
  
    // Append the file name
    downloadLink.download = `SPECS - ${title}.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  // Call the function
  ejecutar();

}