import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Title from './Title';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    };

    componentDidMount() {
        this.onTermSubmit('cats');
    }
    onTermSubmit =  async term => {
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        });
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    };

    onVideoSelect = selectedVideo => {
        console.log("from teh App ", selectedVideo);
        this.setState({selectedVideo})
    };

    render() {
        return (
            <div className="container">
            <Title title="Youtubelicious" />
                <SearchBar onFormSubmit ={this.onTermSubmit} />
                <div className="ui grid centered container">
                    <div className="ui stackable column grid">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList
                                onVideoSelect={this.onVideoSelect} 
                                videos={this.state.videos}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;