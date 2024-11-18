/* eslint-disable no-undef */
const React = require('react');
const { createRoot } = require('react-dom/client');

const { useState } = React;

const getDomo = () => {
  const data = document.getElementById('app').dataset;
  return {
    name: data.domoName,
    color: data.domoColor,
    age: data.domoAge,
  };
};

function App() {
  const [domo] = useState(getDomo);
  return (
    <div>
      <h1>
        Domo Name:
        {' '}
        {domo.name}
      </h1>
      <h2>
        Domo Age:
        {' '}
        {domo.age}
      </h2>
      <h2>
        Domo Color:
        {' '}
        {domo.color}
      </h2>
      <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
    </div>
  );
}

const init = () => {
  if (!document.getElementById('app')) return;

  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
};

window.onload = init;
