//Haku buttonin
document.getElementById("searchButton").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const businessId = document.getElementById("businessId").value.trim();

  // api url ja kenttä lisäys
  let url = "https://avoindata.prh.fi/opendata-ytj-api/v3/companies?";
  if (name) url += "name=" + name;
  if (businessId) url += "&businessId=" + businessId;

  let response;
  let data;
  try {
    response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Haku epäonnistui:", error);
    return;
  }

  if (data.companies.length === 0) {
    const noResults = document.getElementById("noResults");
    noResults.innerHTML = "Ei tuloksia";
    return;
  }
  // aiksemmat table entryt
  const results = document.getElementById("results");

  // tyhjenna vanhat table entryt
  results.innerHTML = "";

  for (const company of data.companies) {
    const companyName = company.names[0].name;
    const id = company.businessId.value;
    const street = company.addresses[0] ? company.addresses[0].street : "";

    results.innerHTML += `<tr><td>${companyName}</td><td>${id}</td><td>${street}</td></tr>`;
  }
});
