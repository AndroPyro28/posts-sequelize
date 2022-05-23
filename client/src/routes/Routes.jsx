import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function Routes({Component, ...rest}) {
    return (
       <Route
        {...rest}
        render = {(props) => <Component/>}
       />
    )
}

export default Routes
