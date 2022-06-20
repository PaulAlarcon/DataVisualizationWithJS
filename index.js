const obj1Div = document.getElementsByClassName("obj1")[0];
let root = document.getElementsByClassName("root")[0];
// let rootClasses = "relative overflow-x-auto shadow-md";
// root.classList.add(...rootClasses.split(" "));
const API_URL = "https://api.artic.edu/api/v1/artworks";

const getData = async (url) => {
  const response = await fetch(url);
  if (response.status == 200 && response.ok) {
    const responseJson = await response.json();
    return responseJson;
  }
  return {
    err: "err",
  };
};

const createRowWithDataFromObj = (objK, objV) => {
  const row = document.createElement("tr");
  // let rowClasses =
  //   "bg-white border-b dark:bg-gray-800 dark:border-gray-700".split(" ");
  // row.classList.add(...rowClasses);
  const keyCell = document.createElement("td");
  row.appendChild(keyCell);
  const valueCell = document.createElement("td");
  row.appendChild(valueCell);

  keyCell.appendChild(document.createTextNode(objK));

  if (typeof objV == "object" && objV != null) {
    const objVKeys = Object.keys(objV);
    objVKeys.forEach((k) => {
      valueCell.appendChild(createRowWithDataFromObj(k, objV[k]));
    });
    return row;
  } else {
    valueCell.appendChild(document.createTextNode(objV));
    return row;
  }
};

const createHeaderRow = (headersArr) => {
  const headerRow = document.createElement("tr");
  headersArr.forEach((header) => {
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(header));
    headerRow.appendChild(th);
  });
  return headerRow;
};

const dinamycallyDisplayAnObjectOntoHTML = (obj) => {
  if (obj == null) return;
  const table = document.createElement("table");
  // let tableClasses = "text-sm text-left text-gray-500 dark:text-gray-400".split(
  //   " "
  // );
  // table.classList.add(...tableClasses);
  const headerRow = createHeaderRow(["key", "value"]);
  // let headerRowClasses =
  //   "bg-white border-b dark:bg-gray-800 dark:border-gray-700".split(" ");
  // headerRow.classList.add(...headerRowClasses);
  table.appendChild(headerRow);

  const objKeys = Object.keys(obj);
  objKeys.forEach((objK) => {
    let currRow = createRowWithDataFromObj(objK, obj[objK]);
    table.appendChild(currRow);
  });
  obj1Div.appendChild(table);
};

const main = async () => {
  const data = await getData(API_URL);
  let arrData = data.data;
  dinamycallyDisplayAnObjectOntoHTML(arrData[1]);
  // const data = {
  //   name: "paul",
  //   age: 21,
  //   education: {
  //     college: "Queens College",
  //     secondary: "Juan Montalvo",
  //   },
  // };
  // dinamycallyDisplayAnObjectOntoHTML(data);
};

main();
