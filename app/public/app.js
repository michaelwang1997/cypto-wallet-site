class SimpleWidget extends React.Component {
    render() {
        return React.createElement(
            "div",
            { className: "simple-widget" },
            "Currency Exchange Rates"
        );
    }
}

ReactDOM.render(React.createElement(SimpleWidget, null), document.getElementById('root'));
