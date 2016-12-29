import React from 'react'
import Header from '../head'
import Footer from '../footer'
import Menu from '../menu'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../mobile/touch_events';

export default class Layout extends React.Component {

    static getInitialProps(agent) {
        console.log(agent);
        return {
            theme: getMuiTheme({
                userAgent:  navigator ? navigator.userAgent : 'all',
            })
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={this.props.theme}>
                    <div>
                        <Header />
                        <Menu />
                        <div className="container">
                            { this.props.children }
                        </div>
                        <Footer />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}