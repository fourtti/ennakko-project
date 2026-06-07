//Haku buttonin kuuntelija
document.getElementById("searchButton").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const businessId = document.getElementById("businessId").value.trim();

  // api url ja kenttä lisäys
  const url = urlConstructor(name, businessId);

  // fetch ja response json muotoon
  const data = await apiCall(url);

  // lisää tulokset ja ei tuloksen käsittely
  showResults(data.companies);
});


// api url ja kenttä lisäys
function urlConstructor(name, businessId) {
  let url = "https://avoindata.prh.fi/opendata-ytj-api/v3/companies?";
  if (name) url += "name=" + name;
  if (businessId) url += "&businessId=" + businessId;
  return url;
}


// fetch ja response json
async function apiCall(url) {
  let response;
  let data;
  try {
    response = await fetch(url);

    if(!response.ok) {
        return;
    }

    data = await response.json();
  } catch (error) {
    console.error("Haku epäonnistui:", error);
    return;
  }
  return data;
}


 // lisää tulokset ja ei tuloksen käsittely
function showResults(companies) {
    // aiksemmat table entryt
    const results = document.getElementById("results");
    // ei tuloksia paragraph
    const noResults = document.getElementById("noResults");
  
    // tyhjennä vanhat table entryt
    results.innerHTML = "";

    if (companies.length === 0) {
      noResults.innerHTML = "Ei tuloksia";
      return;
    }

    // tyhjennä vanha 'Ei tuloksia'
    noResults.innerHTML = "";

    for (const company of companies) {
      results.innerHTML += companyToRow(company);
    }
  }

  
// lisää tulokset ja ei tuloksen käsittely
function companyToRow(company) {
    const name = company.names[0].name;
    const id = company.businessId.value;
    const street = company.addresses[0] ? company.addresses[0].street : "";
    const postCode = company.addresses[0] ? company.addresses[0].postCode : "";
    const city = company.addresses[0] ? company.addresses[0].postOffices[1].city : "";
    const buildingNumber = company.addresses[0] ? company.addresses[0].buildingNumber : "";
    const website = company.website ? company.website.url : "";

    return `<tr><td>${name}</td><td>${id}</td><td>${street} ${buildingNumber}  ${postCode} ${city}</td><td>${website}</td></tr>`;
  }
