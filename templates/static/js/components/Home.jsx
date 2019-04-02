import React, { Component } from 'react';
import AlbumList from './AlbumList';
import ThisWeeksAlbums from './ThisWeeksAlbums';
import MemberList from './MemberList';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import { sizing } from '@material-ui/system';

const styles = theme => ({
    bodyDiv: {
        margin: '8px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        textAlign: 'center',
    },

    thisWeekContainer: {
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'center',
        backgroundColor: '#2c2f33',
        boxShadow: '0px 0px 15px #1b1a1a inset'
    },

    albumDiv: {
        width: '310px',
    },

    progress: {
        margin: theme.spacing.unit * 2,
    },

    membersDiv: {
        width: '310px'
    },
})

class Home extends Component {
    constructor(props){
        super(props);
        this.classes = props.classes;
        this.state = {
            thisWeek: null,
            loadingThisWeek: true,
            albums: [],
            loadingPrevious: true,
            members: [],
            loadingMembers: true
        }
    }

    componentDidMount(){
      fetch('/api/this-week', {
        method: 'GET'
      }).then(response => response.json()
      .then(data => {
        console.log(data);
        this.setState((state, props) => {
          return {thisWeek: data, loadingThisWeek: false};
        });
      }));
      fetch('/api/albums', {
        method: 'GET'
      }).then(response => response.json()
      .then(data => {
        this.setState((state, props) => {
          return {albums: data, loadingPrevious: false};
        });
      }));
      fetch('/api/members', {
        method: 'GET'
      }).then(response => response.json()
      .then(data => {
        this.setState((state, props) => {
          return {members: data, loadingMembers: false};
        });
      }));
    }

    render() {
      let albumList;
      if (this.state.loadingPrevious){
        albumList = <CircularProgress className={this.state.progress} />
      } else {
        albumList = <AlbumList albums={this.state.albums} />;
      }
      let thisWeek;
      if (this.state.loadingThisWeek){
        thisWeek = <CircularProgress className={this.state.progress} size='200' />
      } else if (this.state.loadingPrevious){
        thisWeek = <ThisWeeksAlbums albums={this.state.thisWeek}/>;
      } else {
        thisWeek = <ThisWeeksAlbums albums={this.state.thisWeek} previous={this.state.albums}/>;
      }
      let members;
      if (this.state.loadingMembers){
        members = <CircularProgress className={this.state.progress} />
      } else {
        members = <MemberList members={this.state.members}/>;
      }
      return (
        <div className={this.classes.bodyDiv}>
          <div className={this.classes.albumDiv}>
            {albumList}
          </div>
          <div className={this.classes.thisWeekContainer}>
            {thisWeek}
          </div>
          <div className={this.classes.membersDiv}>
            {members}
          </div>
        </div>
      );
    }
}

export default withStyles(styles)(Home);