
//Haku buttonin 
document.getElementById("searchButton").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const businessId = document.getElementById("businessId").value;

  // api url ja kenttä lisäys
  let url = "https://avoindata.prh.fi/opendata-ytj-api/v3/companies?";
  if (name) url += "name=" + name;
  if (businessId) url += "&businessId=" + businessId;

  const response = await fetch(url);
  const data = await response.json();

 

  for (const company of data.companies) {
    const companyName = company.names[0].name;
    const id = company.businessId.value;
    const street = company.addresses[0] ? company.addresses[0].street : "";

    results.innerHTML += `<tr><td>${companyName}</td><td>${id}</td><td>${street}</td></tr>`;
  }
});
