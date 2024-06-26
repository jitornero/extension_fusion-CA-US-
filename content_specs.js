(function () {
  const htmlLang = document.querySelector("html");
  const country = htmlLang.getAttribute('lang');

  function removeEmptyRows(combinedData) {
    return combinedData.filter(row => {
      // Check if all cells in the row are empty
      return row.some(cell => cell !== '--------------------------------------------------------------------------------------------------' && cell.trim() !== '');
    });
  }

  if (country == "en-CA") {

    function ejecutar() {
      let specsContainer = document.querySelector('.fgx-brand-accordion-item:nth-child(2)');
      let title = document.title;
      const articles = specsContainer.querySelectorAll('article');
      let combinedDataImperial = [];
      let combinedDataMetric = [];

      articles.forEach((article) => {
        const articleH3 = article.querySelector('h3');

        if (articleH3) {
          combinedDataImperial.push([articleH3.textContent.trim()]);
          combinedDataMetric.push([articleH3.textContent.trim()]);
        }

        const articleTable = article.querySelectorAll('table');

        console.log('tables', articleTable);

        articleTable.forEach((table) => {
          const unitType = table.getAttribute('data-fd-spec-unit');
          console.log(table);

          if (unitType === 'metric') {
            table.querySelectorAll('tr').forEach((row) => {
              const rowDataMetric = [];
              row.querySelectorAll('td, th').forEach((cell) => {
                rowDataMetric.push(formatCellValue(cell.textContent.trim()));
              });
              combinedDataMetric.push(rowDataMetric);
            });
          } else if (unitType === 'imperial') {
            table.querySelectorAll('tr').forEach((row) => {
              const rowData = [];
              row.querySelectorAll('td, th').forEach((cell) => {
                rowData.push(formatCellValue(cell.textContent.trim()));
              });
              combinedDataImperial.push(rowData);
            });
          }
        });
      });

      // Filter out empty rows
      combinedDataImperial = removeEmptyRows(combinedDataImperial);
      combinedDataMetric = removeEmptyRows(combinedDataMetric);

      console.log('imperial', combinedDataImperial);
      console.log('metric', combinedDataMetric);

      const csvLinesMetric = convertToCSV(combinedDataMetric);
      const csvLinesImperial = convertToCSV(combinedDataImperial);

      const csvContentMetric = "\uFEFF" + csvLinesMetric.join('\r\n');
      const csvContentImperial = "\uFEFF" + csvLinesImperial.join('\r\n');

      const csvBlobMetric = new Blob([csvContentMetric], { type: 'text/csv;charset=utf-8;' });
      const csvUrlMetric = URL.createObjectURL(csvBlobMetric);

      const csvBlobImperial = new Blob([csvContentImperial], { type: 'text/csv;charset=utf-8;' });
      const csvUrlImperial = URL.createObjectURL(csvBlobImperial);

      createDownloadLink(csvUrlMetric, `SPECS - Metric Units - ${title}.csv`);
      createDownloadLink(csvUrlImperial, `SPECS - Imperial Units - ${title}.csv`);
    }

    // Function to convert combined data to CSV format
    function convertToCSV(combinedData) {
      return combinedData.map(rowData => {
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

    // Function to format cell values as text if necessary
    function formatCellValue(value) {
      if (!isNaN(value.replace(',', '')) && value.includes(',')) {
        return `="${value}"`;
      }
      return value;
    }

    // Call the function
    ejecutar();

  } else {
    function ejecutar() {
      let specsContainer = document.querySelector('.fgx-brand-accordion-item:nth-child(2)');
      let title = document.title;
      const elements = specsContainer.querySelectorAll('h3, table');
      let combinedData = [];
      let currentH3 = null;

      elements.forEach((element) => {
        if (element.tagName === 'H3') {
          currentH3 = element.textContent.trim();
          combinedData.push([currentH3]);
        } else if (element.tagName === 'TABLE') {
          element.querySelectorAll('tr').forEach((row) => {
            const rowData = [];
            row.querySelectorAll('td, th').forEach((cell) => {
              rowData.push(formatCellValue(cell.textContent.trim()));
            });
            combinedData.push(rowData);
          });
          // combinedData.push(['--------------------------------------------------------------------------------------------------']);
        }
      });

      console.log('Data PRE  out empty rows', combinedData);
      // Filter out empty rows
      combinedData = removeEmptyRows(combinedData);

      console.log('Data POST out empty rows', combinedData);

      const csvLines = convertToCSV(combinedData);
      const csvContent = "\uFEFF" + csvLines.join('\r\n');
      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const csvUrl = URL.createObjectURL(csvBlob);

      createDownloadLink(csvUrl, `SPECS - ${title}.csv`);
    }

    // Function to convert combined data to CSV format
    function convertToCSV(combinedData) {
      return combinedData.map(rowData => {
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

    // Function to format cell values as text if necessary
    function formatCellValue(value) {
      if (!isNaN(value.replace(',', '')) && value.includes(',')) {
        return `="${value}"`;
      }
      return value;
    }

    // Call the function
    ejecutar();
  }
})();
