// console.log("hello");

const obj1Div = document.getElementsByClassName("obj1")[0];

let root = document.getElementsByClassName("root")[0];
let txt = document.createTextNode("Art Institute of Chicago API");

root.appendChild(document.createElement("h1").appendChild(txt));

const API_URL = "https://api.artic.edu/api/v1/artworks";

const getData = async (url) => {
  const response = await fetch(url);
  if (response.status == 200 && response.ok) {
    const responseJson = await response.json();
    // console.log(responseJson);
    return responseJson;
  }
  return {
    err: "err",
  };
};

const dinamycallyDisplayAnObjectOntoHTML = (obj) => {
  const objKeys = Object.keys(obj);
  objKeys.forEach((objK) => {
    let objDiv = document.createElement("div");
    let keyDiv = document.createElement("span");
    keyDiv.appendChild(document.createTextNode(objK));
    let valueDiv = document.createElement("span");
    let objValue = obj[objK];
    valueDiv.appendChild(document.createTextNode(objValue));
    objDiv.appendChild(keyDiv);
    objDiv.appendChild(valueDiv);

    obj1Div.appendChild(objDiv);
  });
};

const main = async () => {
  const data = await getData(API_URL);
  //   console.log(data);
  //   console.log(Object.keys(data));
  let arrData = data.data;
  console.log(arrData[0]);
  dinamycallyDisplayAnObjectOntoHTML(arrData[0]);
  //   arrData.forEach((x) => console.log(x));
};

main();
