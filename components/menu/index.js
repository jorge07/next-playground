import React from 'react';
import Link from 'next/link'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});


    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <IconButton iconClassName="muidocs-icon-custom-dehaze" onTouchTap={this.handleToggle} >
                        Menu
                    </IconButton>
                    <Drawer open={this.state.open}>
                        <Link href="/">
                            <MenuItem>Home</MenuItem>
                        </Link>
                        <Link href="/about">
                            <MenuItem>About</MenuItem>
                        </Link>
                    </Drawer>
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <NavigationExpandMoreIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem primaryText="Download" />
                        <MenuItem primaryText="More Info" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}