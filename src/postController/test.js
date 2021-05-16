var data = '{"Mega":"www.mega.nz"}';
// var pairs = data.substring(1, data.length - 1).split(", "); // step 1, split using commas
// var obj = pairs.reduce(function (acc, cur) {
//     var pair = cur.split(":"); // step 2, split using =
//     acc[pair[0].trim()] = pair[1].trim();
//     return acc;
// }, {});
console.log(JSON.parse(data));
