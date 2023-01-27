export function fetchDataFromSanity() {
  let QUERY = encodeURIComponent('*');

  // Compose the URL for your project's endpoint and add the query
  let URL = "https://xq8mz983.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'event'%5D%7B%0A%20%20name%2C%0A%20%20startTime%2C%0A%20%20endTime%2C%0A%20%20isRecurring%2C%0A%20%20recurring_end_date%2C%0A%20%20classroom%2C%0A%20%20subject%2C%0A%20%20event_type%0A%7D";

  // fetch the content
  return fetch(URL)
    .then((res) => res.json())
    .then(({ result }) => result);
}
