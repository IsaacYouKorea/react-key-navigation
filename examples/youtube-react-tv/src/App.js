import React from 'react';
import ReactTV from 'react-tv';

import Sidebar from './Sidebar.js';
import List from './List.js';
import Search from './Search.js';

import Navigation, {
  VerticalList,
  HorizontalList,
  Grid,
  Focusable,
} from 'react-key-navigation';

class ReactTVApp extends React.Component {
  constructor() {
    super();

    this.state = {
      active: null,
    };

    this.lists = ['Title 1', 'Title 2', 'Title 3', 'Title 4'];
  }

  changeFocusTo(index) {
    this.setState({ active: index });
  }

  onBlurLists() {
    this.setState({ active: null });
  }

  render() {
    return (
      <Navigation>
        <div id="container">
          <HorizontalList retainLastFocus>
            <Sidebar />
            <div class="mainbox">
              <VerticalList>
                <Grid rows={10} columns={10} >
                  {Array.from(Array(100).keys()).map((v, i) => {
                    return (
                      <Focusable
                        key={i}
                        onFocus={() => console.log('focus ' + i)}
                        onBlur={() => console.log('blur ' + i)}
                        onEnterDown={() => console.log('enter ' + i)}
                      >
                        Element {i}
                      </Focusable>
                    );
                  })}
                </Grid>
                <Search />
                <VerticalList id="content" onBlur={() => this.onBlurLists()}>
                  {this.lists.map((list, i) => (
                    <List
                      title={list}
                      onFocus={() => this.changeFocusTo(i)}
                      visible={
                        this.state.active !== null
                          ? i >= this.state.active
                          : true
                      }
                    />
                  ))}
                </VerticalList>
              </VerticalList>
            </div>
          </HorizontalList>
        </div>
      </Navigation>
    );
  }
}

ReactTV.render(<ReactTVApp />, document.querySelector('#root'));
