export const saveAsSvg = (svg: SVGSVGElement) => {
    // From: https://stackoverflow.com/a/72255988

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);
    source = source.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    source = source.replace(/ns\d+:href/g, 'xlink:href'); // Safari NS namespace fix.

    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, source], {type: "image/svg+xml;charset=utf-8"});
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "AutismWheel.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};

// PNG
// From: https://stackoverflow.com/a/69695782

const PNG_WIDTH = 400*2;
const PNG_HEIGHT = 300*2;

function downloadImg(svgElem: SVGSVGElement) {
  const serializer = new XMLSerializer();
  let svgData = serializer.serializeToString(svgElem);
  svgData = '<?xml version="1.0" standalone="no"?>\r\n' + svgData;
  const svgBlob = new Blob([svgData], {
    type: 'image/svg+xml;charset=utf-8',
  });
  let DOM_URL = window.URL || window.webkitURL || window;
  const url = DOM_URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if(ctx === null) {
        console.error('Cannot save as PNG - Canvas not supported');
        return;
    }
    canvas.width = PNG_WIDTH;
    canvas.height = PNG_HEIGHT;
    ctx.drawImage(img, 0, 0, PNG_WIDTH, PNG_HEIGHT);
    DOM_URL.revokeObjectURL(url);

    const imgURI = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    download(imgURI);
  };
  img.onerror = (e) => {
    console.error('Image not loaded', e);
  };

  img.src = url;
}

function download(href: string) {
  let download = document.createElement('a');
  download.href = href;
  download.download = 'AutismWheel.png';
  download.click();
  download.remove();
}
export const saveAsPng = (svg: SVGSVGElement) => {
    downloadImg(svg);
};
