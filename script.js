/**
 * The constants for the News API key and the country codes.
 * These constants are used to build the URL for the API request.
 */
const apiKey = `027fe0ba771349fa87775b60c62ba426`
const countryCodes = ['au', 'nz', 'gb', 'us']
const urlPartOne = `https://newsapi.org/v2/top-headlines?country=`
const urlPartTwo = `&apiKey=${apiKey}`


/*
 * Attach the 'change' event listener to all radio buttons with the name 'country'.
 * When a radio button is selected, the 'countrySelected' function is called.
 */
const radioEls = document.querySelectorAll('input[name="country"]')
radioEls.forEach((radioBtn) => {
  // Attach the 'change' event listener to the radio button
  radioBtn.addEventListener('change', countrySelected)
})

/**
 * Handles the selection of a country by fetching data based on the selected country code.
 *
 * @param {Event} evt - The event object triggered by the country selection.
 * @return {void} This function does not return a value.
 */
async function countrySelected(evt) {
  const countryCode = evt.target.value
  const url = `${urlPartOne}${countryCode}${urlPartTwo}`
  const data = await fetchData(url)
  displayResults(data)
}

/**
 * Fetches data from a specified URL using the fetch API.
 *
 * @param {string} url - The URL to fetch data from.
 * @return {Promise} A Promise that resolves with the JSON data fetched from the URL.
 */
async function fetchData(url) {
  try {
    document.querySelector('.output').innerHTML = `<p>Loading...</p>`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `URL: ${url} - Response not okay: ${response.status}`
      )
    }
    return response.json()
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`)
  }
}

/**
 * Displays the results of a news API query on the webpage.
 *
 * @param {Object} data - The data object containing the news articles.
 * @return {void} This function does not return anything.
 */
function displayResults(data) {
  const dataArray = data['articles']
  const splitTitleStringOn = ' - '

  let htmlString = ''
  for (let i = 0; i < dataArray.length; i++) {
    let obj = dataArray[i]
    // console.log(obj)
    const titleArray = obj['title'].split(splitTitleStringOn)

    htmlString += `<section>
              <h2>${titleArray[1]}</h2>
              <p>${titleArray[0]}.</p>
              <p>Published at: ${new Date(obj['publishedAt']).toLocaleString()}: <a href="${obj['url']}" rel="noopener noreferrer" target="_blank">Link to story</a></p>
              </section>
              <hr>`
  }
  document.querySelector('.output').innerHTML = htmlString
}
