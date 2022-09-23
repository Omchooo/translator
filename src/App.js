import React from "react";
import "./App.css";
import languages from "./components/languages";

function App() {
  const encodedParams = new URLSearchParams();
  const inputClick = (key, name) => {
    encodedParams.delete("to", key);
    encodedParams.append("from", key);
    document.getElementById("in").innerHTML = name;
  };

  const outputClick = (key, name) => {
    encodedParams.delete("to", key);
    encodedParams.append("to", key);
    document.getElementById("out").innerText = name;
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "b5fbbf02e6msh4aacdf98c2f1f11p1b2315jsn49f1072e8b3e",
      "X-RapidAPI-Host": "translo.p.rapidapi.com",
    },
    body: encodedParams,
  };

  const translate = () => {
    document.getElementById("output").innerText = "Translating, please wait..";
    const interval = setInterval(() => {
      const inp = document.getElementById("input-txt").value;
      encodedParams.append("text", inp);

      fetch("https://translo.p.rapidapi.com/api/v3/translate", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok === false) {
            document.getElementById("output").innerText =
              "Error: " + data.error;
          } else {
            document.getElementById("output").innerText = data.translated_text;
          }
        })
        .catch((err) => console.error(err));

      encodedParams.delete("text", inp);

      clearInterval(interval);
    }, 2000);
  }

  const clip = () => {
  const copyText = document.getElementById("output").innerText
  navigator.clipboard.writeText(copyText);
  }

  return (
    <div className="main-pad layout">
      <div className="main layout">
        <div className="left">
          <div className="center-line"></div>
          <div className="up-content layout">
            <div className="underline layout">
              From:
              <div className="btn-group btn-h-38">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  id="in"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                >
                  Choose language
                </button>

                <ul className="dropdown-menu">
                  {languages.map((language, index) => (
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() =>
                            inputClick(language.code, language.name)
                          }
                          key={index}
                        >
                          {language.name}
                        </button>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="down-content layout">
            <div className="input-txt layout">
              <textarea
                type="text"
                id="input-txt"
                placeholder="Enter your text here..."
                onChange={() => translate()}
              />
            </div>
          </div>
        </div>

        <div className="right layout">
          <div className="up-content layout">
            <div className="underline layout">
              To:
              <div className="btn-group btn-h-38">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  id="out"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="true"
                  aria-expanded="false"
                >
                  Choose language
                </button>
                <ul className="dropdown-menu">
                  {languages.map((language, index) => (
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() =>
                          outputClick(language.code, language.name)
                        }
                        key={index}
                      >
                        {language.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="down-content layout">
            <div className="output-txt">
              <pre id="output"></pre>
            </div>
          </div>
          <button type="button" className="btn btn-outline-dark c-btn layout" onClick={() => clip()}><svg id="IconChangeColor"  x="0px" y="0px" viewBox="0 0 115.77 122.88"  height="20px" width="20px"><g><path class="st0" d="M89.62,13.96v7.73h12.19h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02v0.02 v73.27v0.01h-0.02c-0.01,3.84-1.57,7.33-4.1,9.86c-2.51,2.5-5.98,4.06-9.82,4.07v0.02h-0.02h-61.7H40.1v-0.02 c-3.84-0.01-7.34-1.57-9.86-4.1c-2.5-2.51-4.06-5.98-4.07-9.82h-0.02v-0.02V92.51H13.96h-0.01v-0.02c-3.84-0.01-7.34-1.57-9.86-4.1 c-2.5-2.51-4.06-5.98-4.07-9.82H0v-0.02V13.96v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07V0h0.02h61.7 h0.01v0.02c3.85,0.01,7.34,1.57,9.86,4.1c2.5,2.51,4.06,5.98,4.07,9.82h0.02V13.96L89.62,13.96z M79.04,21.69v-7.73v-0.02h0.02 c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v64.59v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h12.19V35.65 v-0.01h0.02c0.01-3.85,1.58-7.34,4.1-9.86c2.51-2.5,5.98-4.06,9.82-4.07v-0.02h0.02H79.04L79.04,21.69z M105.18,108.92V35.65v-0.02 h0.02c0-0.91-0.39-1.75-1.01-2.37c-0.61-0.61-1.46-1-2.37-1v0.02h-0.01h-61.7h-0.02v-0.02c-0.91,0-1.75,0.39-2.37,1.01 c-0.61,0.61-1,1.46-1,2.37h0.02v0.01v73.27v0.02h-0.02c0,0.91,0.39,1.75,1.01,2.37c0.61,0.61,1.46,1,2.37,1v-0.02h0.01h61.7h0.02 v0.02c0.91,0,1.75-0.39,2.37-1.01c0.61-0.61,1-1.46,1-2.37h-0.02V108.92L105.18,108.92z" id="mainIconPathAttribute" fill="#737373"></path></g></svg></button>
        </div>
      </div>
    </div>
  );
}

export default App;
