const getData = (data) => {
  const d = [Math.floor(data / 60), data % 60]
  while (d[0] >= 60) {
    d.unshift(Math.floor(d[0] / 60))
    d[1] %= 60
  }
  console.log(d);
  return d
}
getData(3599)