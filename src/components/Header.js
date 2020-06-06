import React, {PureComponent} from "react";

class Header extends PureComponent{
    render() {
        return (
            <nav className="navbar">
                <h1 className="header">My Music App</h1>
            </nav>
        )
    }
}
export default Header;