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
  const color = e.target.querySelector('#domoColor').value;

  if (!name || !age) {
    helper.handleError('All fields are required');
    return false;
  }

  helper.sendPost(e.target.action, { name, age, color }, onDomoAdded);
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
      <div className="inputGroup">
        <label htmlFor="name">Name: </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name" />
      </div>

      <div className="inputGroup">
        <label htmlFor="age">Age: </label>
        <input id="domoAge" type="number" min="0" name="name" />
      </div>

      <div className="inputGroup">
        <label htmlFor="color">Color: </label>
        <input id="domoColor" type="text" name="color" defaultValue="Brown" />
      </div>

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

  const routeDomoPage = (name) => {
    window.open(`/domo/${name}`);
  };

  const domoNodes = domos.map((domo) => (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div key={domo.id} className="domo" onClick={() => { routeDomoPage(domo.name); }}>
      <img src="/assets/img/domoFace.jpeg" alt="domo face" className="domoFace" />
      <h3 className="domoName">
        Name:
        {domo.name}
      </h3>
      <h3 className="domoAge">
        Age:
        {domo.age}
      </h3>
      <h3 className="domoColor">
        Color:
        {domo.color}
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
