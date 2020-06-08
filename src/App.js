import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchForm from "./components/SearchForm"
import Header from "./components/Header";
import RecordingContainer from "./components/RecordingContainer";
import ActionModal from "./components/ActionModal";
import Requests from './api/musicBrainzApi';
import renderIf from "./helpers/renderIf";
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            results : [],
            recordingCount : null,
            isLoading :false,
            entityId : '',
            showModal : false,
            showMoreResultsButton: false,
        }
        this.currentQuery = {
            offset: 0,
            search: '',
            choice: '',
        }
    }

    getResults = (search,choice,offset=0)=>{
        this.setState({
            isLoading:!this.state.isLoading
        });
        //reinitialize offset to 0 when user clicks the search button
        if(offset === 0){
            this.currentQuery.offset = 0;
        }
        Requests.getRecordings(search,choice,offset).then(res=>{
            this.currentQuery = {
                offset: this.currentQuery.offset + 100,
                search: search,
                choice: choice,
            };
            this.setState({
                results: offset===0 ? res.recordings :[...this.state.results,...res.recordings],
                recordingCount : res.count,
                showMoreResultsButton: this.currentQuery.offset < res.count,
                isLoading:false,
            });
        }).catch(err =>console.log(err));
    }

    getMoreResults = ()=>{
        const {search,choice,offset} = this.currentQuery;
        this.getResults(search,choice,offset);
    }

    handleModal = (entityId)=>{
        this.setState({
            showModal : !this.state.showModal,
            entityId : entityId,
        });
    }

    render() {
        const {results,isLoading,showModal,entityId,recordingCount,showMoreResultsButton} = this.state;
        const spinner = <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>;
        return (
            <div className="App">
                <Header/>
                <SearchForm getData={this.getResults} loading={this.changeLoading}/>
                <RecordingContainer  getMoreData={this.getMoreResults}  loading={this.changeLoading} results={results} count={recordingCount} showMoreResults={showMoreResultsButton} handleModal={this.handleModal}/>
                <ActionModal show={showModal} handleModal={this.handleModal} entityId={entityId}/>
                {renderIf(isLoading,spinner)}
            </div>

        )
    }
}

export default App;


