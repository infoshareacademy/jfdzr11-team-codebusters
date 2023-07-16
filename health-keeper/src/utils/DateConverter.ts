type Date = {
  nanoseconds: number;
  seconds: number;
};

function dateConvert(data: Date, type: string) {
  const date = new Date(data.seconds * 1000 + data.nanoseconds / 1000000);
  let mm: number | string = Number(date.getMonth()) + 1;
  let dd: number | string = Number(date.getDate());
  const yyyy = date.getFullYear();

  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (type === "normal") {
    return dd + "-" + mm + "-" + yyyy;
  } else {
    return yyyy + "-" + mm + "-" + dd;
  }
}

export default dateConvert;
