//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', calculate);

let encodeURL = {
  " ": "%20",
  "!": "%21",
  "\"": "%22",
  "#": "%23",
  "$": "%24",
  "%": "%25",
  "&": "%26",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "*": "%2A",
  "+": "%2B",
  ",": "%2C",
  "-": "%2D",
  ".": "%2E",
  "/": "%2F",
  ":": "%3A",
  ";": "%3B",
  "<": "%3C",
  "=": "%3D",
  ">": "%3E",
  "?": "%3F",
  "@": "%40",
  "[": "%5B",
  "\\": "%5C",
  "]": "%5D",
  "^": "%5E",
  "_": "%5F",
  "`": "%60",
  "{": "%7B",
  "|": "%7C",
  "}": "%7D",
  "~": "%7E"
}

function calculate() {
  const input = document.querySelector('input').value;
  const chars = input.split('');

  for ( let i = 0; i < chars.length; i++ ) {
    if( chars[i] in encodeURL ) {
      chars[i] = encodeURL[chars[i]]
    }
  }
  const expression = chars.join("");
  const url = `https://newton.now.sh/api/v2/simplify/${expression}`;

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      document.querySelector('h2').innerText = `${data.expression} = ${data.result}`;
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

