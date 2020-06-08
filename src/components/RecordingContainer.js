import React, {PureComponent} from 'react';
import Recording from './Recording';
import renderIf from "../helpers/renderIf";

class RecordingContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.offset = 100;
    }

    moreResults = ()=>{
        this.props.getMoreData();
    }

    render() {
        const {results,handleModal,count,showMoreResults} = this.props;
        const moreResultsButton = <div className="text-center"> <button className="btn btn-primary" onClick={this.moreResults}> plus de résultas</button> </div>;
        const message =  <p className="text-center">Entrez un élément de recherche</p>;
        return (
            <div>
                <p className="search-results">Résultats : {count}</p>
                <table className="table mt-2">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Artiste</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Album</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*i used the index as a key because rendered items don’t have stable UUIDs*/}
                        {results.map((recording,index)=><Recording {...recording}  key={index} listNumber={index+1} handleModal={handleModal}/>)}
                    </tbody>
                </table>
                {renderIf(showMoreResults,moreResultsButton)}
                {renderIf(!count,message)}
            </div>
        );
    }
}

export default RecordingContainer;