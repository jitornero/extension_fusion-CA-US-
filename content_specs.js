
(function () {
  const htmlLang = document.querySelector("html");
  const country = htmlLang.getAttribute('lang');



  if (country == "en-CA") {

    function ejecutar() {
      let specsContainer = document.querySelector('.fgx-brand-accordion-item:nth-child(2)');
      let title = document.title;
      const articles = specsContainer.querySelectorAll('article');
      const combinedData = [];

      articles.forEach((article) => {
        // Get the h3 tag within each article
        const articleH3 = article.querySelector('h3');
        if (articleH3) {
          // Push the h3 content to combinedData
          combinedData.push([articleH3.textContent.trim()]);
        }
        // Get the table within each article
        const articleTable = article.querySelector('table');
        if (articleTable) {
          // Push the table content to combinedData
          articleTable.querySelectorAll('tr').forEach((row) => {
            const rowData = [];
            row.querySelectorAll('td, th').forEach((cell) => {
              rowData.push(cell.textContent.trim());
            });
            combinedData.push(rowData);
          });
        }
      });

      console.log(combinedData);

      // const csvLinesMetric = convertToCSV(combinedDataMetric);
      // const csvLinesImperial = convertToCSV(combinedDataImperial);

      // const csvContentMetric = "\uFEFF" + csvLinesMetric.join('\r\n');
      // const csvContentImperial = "\uFEFF" + csvLinesImperial.join('\r\n');

      // const csvBlobMetric = new Blob([csvContentMetric], { type: 'text/csv;charset=utf-8;' });
      // const csvUrlMetric = URL.createObjectURL(csvBlobMetric);

      // const csvBlobImperial = new Blob([csvContentImperial], { type: 'text/csv;charset=utf-8;' });
      // const csvUrlImperial = URL.createObjectURL(csvBlobImperial);

      // createDownloadLink(csvUrlMetric, `SPECS - Metric Units - ${title}.csv`);
      // createDownloadLink(csvUrlImperial, `SPECS - Imperial Units - ${title}.csv`);
    }

    // Function to convert combined data to CSV format
    // function convertToCSV(combinedData) {
    //   return combinedData.map(rowData => {
    //     const escapedRowArray = rowData.map(value => {
    //       return '"' + value.replace(/"/g, '""') + '"';
    //     });
    //     return escapedRowArray.join(';');
    //   });
    // }

    // // Function to create and trigger download links
    // function createDownloadLink(csvUrl, fileName) {
    //   const downloadLink = document.createElement('a');
    //   downloadLink.href = csvUrl;
    //   downloadLink.download = fileName;
    //   downloadLink.style.display = 'none';
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    //   document.body.removeChild(downloadLink);
    // }

    // Call the function
    ejecutar();

  }

  else {
    function ejecutar() {
      let specsContainer = document.querySelector('.fgx-brand-accordion-item:nth-child(2)');

      let title = document.title;

      const elements = specsContainer.querySelectorAll('h3, table');

      const combinedData = [];

      let currentH3 = null; // Variable to store the current h3 tag

      elements.forEach((element) => {
        if (element.tagName === 'H3') {
          currentH3 = element.textContent.trim();
          combinedData.push([currentH3, '--------------------------------------------------------------------------------------------------']);
        } else if (element.tagName === 'TABLE') {
          element.querySelectorAll('tr').forEach((row, rowIndex) => {
            const rowData = [];

            row.querySelectorAll('td, th').forEach((cell, cellIndex) => {
              rowData.push(cell.textContent.trim());
            });

            combinedData.push(rowData);
          });

          combinedData.push(['--------------------------------------------------------------------------------------------------']); // One row with dashes
        }
      });
      console.log(combinedData);

      const csvLines = combinedData.map(rowData => {
        const escapedRowArray = rowData.map(value => {
          return '"' + value.replace(/"/g, '""') + '"';
        });
        return escapedRowArray.join(';');
      });

      const csvContent = "\uFEFF" + csvLines.join('\r\n');

      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const csvUrl = URL.createObjectURL(csvBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = csvUrl;

      downloadLink.download = `SPECS - ${title}.csv`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    // Call the function
    ejecutar();

  }

})()