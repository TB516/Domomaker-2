/* eslint-disable no-undef */
const React = require('react');
const { createRoot } = require('react-dom/client');
const helper = require('./helper');

const { useState, useEffect } = React;

const handleDomo = (e, onDomoAdded) => {
  e.preventDefault();
  helper.hideError();

  const name = e.target.querySelector('#domoName').value;
  const age = e.target.querySelector('#domoAge').value;

  if (!name || !age) {
    helper.handleError('All fields are required');
    return false;
  }

  helper.sendPost(e.target.action, { name, age }, onDomoAdded);
  return false;
};

function DomoForm({ triggerReload }) {
  return (
    <form
      id="domoForm"
      onSubmit={(e) => handleDomo(e, triggerReload)}
      name="domoForm"
      action="/maker"
      method="POST"
      className="domoForm"
    >
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name" />

      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="number" min="0" name="name" />

      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
  );
}
function DomoList({ pdomos, reloadDomos }) {
  const [domos, setDomos] = useState(pdomos);

  useEffect(() => {
    const loadDomosFromServer = async () => {
      const response = await fetch('/getDomos');
      const data = await response.json();
      setDomos(data.domos);
    };
    loadDomosFromServer();
  }, [reloadDomos]);

  if (domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos Yet!</h3>
      </div>
    );
  }

  const domoNodes = domos.map((domo) => (
    <div key={domo.id} className="domo">
      <img src="/assets/img/domoFace.jpeg" alt="domo face" className="domoFace" />
      <h3 className="domoName">
        Name:
        {domo.name}
      </h3>
      <h3 className="domoAge">
        Age:
        {domo.age}
      </h3>
    </div>
  ));

  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
}

function App() {
  const [reloadDomos, setReloadDomos] = useState(false);

  return (
    <div>
      <div id="makeDomo">
        <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
      </div>
      <div id="domos">
        <DomoList pdomos={[]} reloadDomos={reloadDomos} />
      </div>
    </div>
  );
}

const init = () => {
  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
};

window.onload = init;
