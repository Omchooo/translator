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

        <div className="right">
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
        </div>
      </div>
    </div>
  );
}

export default App;
