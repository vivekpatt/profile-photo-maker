var jimp = require("jimp");
var DP_IN = "dp.png";
var DP_OUT = "dp-circle.png";

async function main() {
  const dp = await jimp.read("./input/" + DP_IN);
  dp.quality(60)
    .circle()
    .write("./output/" + DP_OUT);
}
main();
