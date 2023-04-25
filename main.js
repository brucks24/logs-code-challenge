import fs from 'fs';

const logFile = 'lb.log';

const browserCounts = {};

// Read the user agent log file
fs.readFile(logFile, 'utf8', (err, data) => {
  if (err) throw err;

  // Split the log file into an array of logs
  const userAgents = data.split('\n');

  // Loop through each log and extract the browser type and version
  userAgents.forEach((userAgent) => {
    const browserInfo = getBrowserInfo(userAgent);

    // Add the browser type and version to the browserCounts object
    if (browserInfo) {
      const browserKey = browserInfo.type + ' ' + browserInfo.version;
      browserCounts[browserKey] = browserCounts[browserKey]
        ? browserCounts[browserKey] + 1
        : 1;
    }
  });

  // Sort the browser counts in descending order.
  const sortedCounts = sortMapIntoArray(browserCounts);

  // Output the sorted browser counts
  fs.writeFileSync('userAgents.json', JSON.stringify(sortedCounts, null, 4));
  console.log(sortedCounts);

  const noLogicGateRegex = /^((?!logicgate).)*$/;

  // Loop through each log line and check for malicious requests
  const ipAddresses = {};
  let count = 0;
  let badRequests = [];

  for (let i = 0; i < userAgents.length - 1; i++) {
    const logLine = userAgents[i];
    const logComponent = logLine.split(' ');
    const ipAddr = logComponent[3];
    const url = logComponent[13];

    //find requested urls that dont contain logicgate in the domain
    if (noLogicGateRegex.test(url)) {
      console.log(logComponent[0], logComponent[8]);
      ipAddresses[ipAddr] = ipAddresses[ipAddr] ? ipAddresses[ipAddr] + 1 : 1;
      count += 1;
      badRequests.push(logLine);
      console.log(`Potentially malicious request at line ${i + 1}`);
    }
  }
  //sort the ipAddresses based on the number of appearances in malicious requests. Descending order
  const sortedIPAddresses = sortMapIntoArray(ipAddresses);

  //write the badRequests array to file for review
  fs.writeFileSync('badRequests.json', JSON.stringify(badRequests, null, 4));

  //create file and write sorted ipaddresses array to file
  fs.writeFileSync(
    'ipaddresses.json',
    JSON.stringify(sortedIPAddresses, null, 4)
  );
  console.log(
    '********************************************************************************************'
  );

  console.log(count, 'potentially malicious requests');
  console.log(userAgents.length, 'total requests scanned');
  console.log(
    'Please take a look at the files that were created in the current directory such as \nuserAgents.json which shows the most popular user agents \nbadRequests.json which shows all the log records that were flagged as malicious and \nipaddresses.json which shows which ipaddresses were sending the most malicous requests'
  );
  console.log(
    '********************************************************************************************'
  );
});

//Array usage is a must due to the fact that maps are not sortable
function sortMapIntoArray(obj) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}

// Function to extract the browser type and version from a user agent string
function getBrowserInfo(userAgent) {
  const matches = userAgent.match(
    /(chrome|firefox|safari|opera|msie|trident|edge)\/([\d\.]+)/i //I pulled this regex from stack overflow
  );
  if (matches && matches.length === 3) {
    return {
      type: matches[1].toLowerCase(),
      version: matches[2],
    };
  }
  return null;
}
