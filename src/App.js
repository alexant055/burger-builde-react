import React from 'react';

/* Components */
import Layout from './components/Layout/Layout'

/* Containers */
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
    return (
        <div>
            <Layout>
                <BurgerBuilder/>
            </Layout>
        </div>
    );
}

export default App;
