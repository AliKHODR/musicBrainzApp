import React, {Component} from "react";

class SearchForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search : "",
            choice : "",
            disableSearchButton : false
        }
    }

    formSubmit= event=>{
        event.preventDefault();
        const {search,choice} = this.state;
        this.props.getData(search,choice,0);
        this.setState({
            disableSearchButton : true
        })
        //forcing at least one second interval between each request
        setTimeout(()=>{
            this.setState({
                disableSearchButton:false
            })
        },1000)
    }

    handleChange = event=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {search,choice,disableSearchButton} = this.state;
        return (
            <div className="form ">
                <form className=" pt-4" onSubmit={this.formSubmit}>
                    <div className="form-row">
                        <div className="col-md-8 mb-3">
                            <label className="search-label" htmlFor="validationCustom03">Votre Recherche</label>
                            <input type="text" name="search" value={search} className="form-control" id="validationCustom03" required onChange={this.handleChange}/>
                        </div>
                        <div className="col-2 pt-4 mt-1">
                            <select value={choice} name="choice" className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleChange}>
                                <option value="everything">Tout</option>
                                <option value="artist">Artiste</option>
                                <option value="recording">Titre</option>
                                <option value="release">Album</option>
                            </select>
                        </div>
                        <div className="col-2 pt-4 mt-2">
                            <button type="submit" className="btn btn-primary" disabled={disableSearchButton}>Rechercher</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchForm;