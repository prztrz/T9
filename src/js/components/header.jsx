import React from 'react';

class Header extends React.Component {
    render(){
        return(
            <header className="pageHeader">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <h1 className="pageHeader__logo">
                            T9 text conventer
                        </h1>
                    </div>
                </div>
            </header>
        );
    }
}

export {Header}