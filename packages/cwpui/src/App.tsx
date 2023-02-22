import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import { CWP } from "../../cwpcore/src";
import { AnnounceConfig, CwpContext, IPortalUser, UILevel } from '../../cwpinterface/src';
import { ModalService } from './CommonUI/Modal/ModalContainer';
import { Main } from './CommonUI/Main/Main';
import { AnnouncementService } from './CommonUI/Announcement/Announcement';
import { LoaderService } from './CommonUI/Loader/Loader';

class App extends React.Component {
  ctx:CwpContext;
  constructor(props) {
    super(props);   
    this.ctx = CWP.getInstance();
    this.state = {navItems: [], user : {} as IPortalUser};
  }
  
  async componentDidMount() {
     const user = await this.ctx.user.getCurrentUserAsync();
     const navTemplate = await this.ctx.apps.getNavTemplate(user);
     this.setState({navTemplate: navTemplate, user: user });
     this.ctx.ui.renderAnnouncement("HELLO WORLD", {
      open: true,
      msgLevel: UILevel.info,
      triggerId: 'cwp_app',
      timeout: 3,
     } as AnnounceConfig)
  }

  render() {
    return(
    <div className="App">
      <AnnouncementService></AnnouncementService>
      <Header logo={logo}></Header>
      <Nav navTemplate={this.state.navTemplate} ></Nav>
      <Main allItems= {this.state.navTemplate}  user={this.state.user}></Main>
      <ModalService></ModalService>
      <LoaderService></LoaderService>
    </div>)
  ;
}

}

export default App;


