var jimp = require("jimp");
var DP_IN = "dp2.png";
var DP_OUT = "dp-circle2.png";
var BACKDROP = "backdrop.png";

async function main() {
  const dp = await jimp.read("./input/" + DP_IN);
  const dp_mask = dp.clone();
  const bd = await jimp.read("./input/" + BACKDROP);

  //*   Create mask from input DP
  dp_mask.color([{ apply: "saturate", params: [5] }]);
  dp_mask
    .pixelate(5)
    .blur(5)
    .scan(
      0,
      0,
      dp_mask.bitmap.width,
      dp_mask.bitmap.height,
      function (x, y, idx) {
        let red = this.bitmap.data[idx + 0];
        let green = this.bitmap.data[idx + 1];
        let blue = this.bitmap.data[idx + 2];

        let threshold = 3;
        let maxPixel = 210;

        if (
          (Math.abs(red - green) > threshold &&
            Math.abs(red - blue) > threshold &&
            Math.abs(green - blue) > threshold) ||
          !(red > maxPixel && green > maxPixel && blue > maxPixel)
        ) {
          this.bitmap.data[idx + 0] = 0;
          this.bitmap.data[idx + 1] = 0;
          this.bitmap.data[idx + 2] = 0;
        }
      }
    );

  // dp_mask.write("./output/bd.png");
  bd.resize(dp_mask.bitmap.width, dp_mask.bitmap.height).mask(dp_mask);

  dp.blit(bd, 0, 0)
    .quality(60)
    .circle()
    .write("./output/" + DP_OUT);
}
main();
