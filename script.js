const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const stringToColor = (text, saturation = 100, lightness = 75) => {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash += text.charCodeAt(i);
  }

  const hue = hash % 360

  return hslToHex(hue, saturation, lightness);
}

const parseHex = hex => {
  if (hex.indexOf('#') === 0) {
   hex = hex.slice(1);
  }

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return {r, g, b};
}

const invertColor = (hex) => {
  let {r, g, b} = parseHex(hex)
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
}

const run = () => {
  const elements = document.getElementsByClassName('ghx-extra-field')

  for (let element of elements) {
    const label = element.textContent;
    const bgColor = stringToColor(label)
    const color = invertColor(bgColor)

    element.style.backgroundColor = bgColor;
    element.style.color = color;
    element.style.padding = '0px 10px';
    element.style.borderRadius = '10px';
  }
  setTimeout(run, 1000)
}

run()
