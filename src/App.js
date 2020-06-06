import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchForm from "./components/SearchForm"
import Header from "./components/Header";
import RecordingContainer from "./components/RecordingContainer";
import ActionModal from "./components/ActionModal";
import Requests from './api/musicBrainzApi';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            results : [],
            recordingCount : null,
            isLoading :false,
            search : '',
            choice:'',
            offset:null,
            entityId : '',
            showModal : false
        }
    }

    getResults = (search,choice,offset)=>{
        if(this.state.search !== search || this.state.choice !== choice){
            this.setState({
                results:[]
            })
        }
        if(this.state.offset === offset) return;
        this.setState({
            isLoading:true
        })
        Requests.getRecordings(search,choice,offset).then(res=>{
            this.setState({
                results:[...this.state.results,...res.recordings],
                recordingCount : res.count,
                isLoading:false,
                search:search,
                choice:choice,
                offset:offset
            })
        }).catch(err =>console.log(err))
    }

     changeLoading = (loading=true)=>{
        console.log(this.state.offset)
        if (this.state.offset !== 0){
            this.setState({
                isLoading:loading
            })
        }
    }
    handleModal = (entityId)=>{
            this.setState({
                showModal : !this.state.showModal,
                entityId : entityId,
            })
    }

    render() {
        const {results,search,choice,isLoading,showModal,entityId,recordingCount} = this.state;
        console.log(this.state.offset)
        const spinner = <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>;
        return (
            <div className="App">
                <Header/>
                <SearchForm getData={this.getResults} loading={this.changeLoading}/>
                <RecordingContainer  getData={this.getResults}  loading={this.changeLoading} results={results} count={recordingCount} search={search} choice={choice} handleModal={this.handleModal}/>
                <ActionModal show={showModal} handleModal={this.handleModal} entityId={entityId}/>
                {isLoading && spinner }
            </div>

        )
    }
}

export default App;


