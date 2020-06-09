import React from 'react';
import ProgressBar from './ProgressBar';
import ListBook from './ListBook';
import { connect } from 'react-redux';
import { fetchGetLibrary } from '../../api/Action/Categories/LibraryAction';

const default_state = {
  library: {
    
  },
  library_progress: '',
  is_loading: true,
  is_finished_list: false,
}

class MarketingSales extends React.Component {
  state = default_state;

  componentDidMount = async() => {
    this.setState({is_loading: true})
    const library = await this.props.fetchGetLibrary(this.props.token);
    if (!!library) {
    this.setState({library: library.data.bookself.reading,
      library_progress: library.data.library_progress,
      is_loading: false});
    }

    if (this.state.library.length < 3) {
      var list_book = document.getElementsByClassName('list-book').item(0);
      list_book.style.justifyContent = 'left';
    }
  }

  

  handleClick = async (e) => {
    e.preventDefault();
    if (e.target.classList.contains('in-progress')) {
      this.setState({is_finished_list: false});
    }
    else {
      this.setState({is_finished_list: true})
    }

    this.setState({is_loading: true})
    var library = await this.props.fetchGetLibrary(this.props.token);
    
    if (library.data) {
      if (this.state.is_finished_list === true) 
        this.setState({library: library.data.bookself.finished, 
                      library_progress: library.data.library_progress,
                      is_loading: false});
      else this.setState({library: library.data.bookself.reading,
                          library_progress: library.data.library_progress,
                          is_loading: false});
    }

    if (this.state.library.length < 3) {
      var list_book = document.getElementsByClassName('list-book').item(0);
      list_book.style.justifyContent = 'left';
    }
  };

  render() {
    const {is_loading, is_finished_list, library, library_progress} = this.state;
    
    return (
        <div>     
          <div >
            <div id="category-banner" className="show-flex no-blackout">
              <div id="category-name" className="black-big-text">Marketing & Sales</div>
              <div id="progress-bar">
                <ProgressBar progress={library_progress} token={this.props.token} is_loading={is_loading}/>
              </div>
            </div>
            <div className="grey-18-normal-text show-flex no-blackout">
              <div className="banner">
                <div className={is_finished_list ? "in-progress" : "in-progress orange-text"} onClick={this.handleClick}>Đang đọc</div>
                <div className={is_finished_list ? "in-progress line-below-banner" : "in-progress line-below-banner orange-text"}
                     onClick={this.handleClick}></div>
              </div>
              <div className="banner">
                <div className={is_finished_list ? "finished orange-text" : "finished"} onClick={this.handleClick}>Đã hoàn thành</div>
                <div className={is_finished_list ? "finished line-below-banner orange-text" : "finished line-below-banner"} 
                     onClick={this.handleClick}></div>
              </div>
            </div>
            <ListBook is_loading={is_loading} library={library}/>
          </div>
          {/* } */}
        </div>
    ) 
  }
}

export default connect(null, { fetchGetLibrary })(MarketingSales);
