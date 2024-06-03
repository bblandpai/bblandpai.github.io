function downloadImage(imageUrl) {
    // Function to get the filename from the URL
    function getFilename(url) {
      return url.substring(url.lastIndexOf('/') + 1);
    }
  
    // Define the headers you want to include in the request
    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Cookie': 'cf_clearance=8wH0LcCHc8nmm0sQkOocn5EZtQahYjcww_1Bt2xAIjk-1717357541-1.0.1.1-dX9rCXYV5oClowX1GfOtZf178O2O1qNy7ddSZhIzYB872fOPjuFjae8rqIiijbT0qmXsJR5cbaQGzZT.sz6ceA',
      'Pragma': 'no-cache',
      'Priority': 'u=0, i',
      'Referer': 'https://www.emulatorgames.net/',
      'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"macOS"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    };
  
    // Fetch the image with the specified headers
    return fetch(imageUrl, { headers })
      .then(response => {
        if (response.status === 403) {
          alert('403 Forbidden - Please reload the page.');
          throw new Error('403 Forbidden');
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        const filename = getFilename(imageUrl);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        return filename;
      });
  }
  
  async function downloadImagesWithDelay(imageUrls) {
    let downloadedFiles = JSON.parse(localStorage.getItem('downloadedFiles')) || [];
  
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
  
      if (!downloadedFiles.includes(filename)) {
        try {
          const downloadedFilename = await downloadImage(imageUrl);
          downloadedFiles.push(downloadedFilename);
          localStorage.setItem('downloadedFiles', JSON.stringify(downloadedFiles));
        } catch (error) {
          if (error.message === '403 Forbidden') {
            break;
          }
          console.error('There was a problem with the fetch operation:', error);
        }
      } else {
          console.log(`${filename} is exits`);
          continue;
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Example usage
  const imageUrls = [
      
  ];
  
  downloadImagesWithDelay(imageUrls); // Delay is set to 2000 ms (2 seconds)
  