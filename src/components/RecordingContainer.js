import React, {PureComponent} from 'react';
import Recording from './Recording';

class RecordingContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.offset = 100;
    }

    moreResults = ()=>{
        const {search,choice} = this.props;
        this.props.loading();
        this.props.getData(search,choice,this.offset);
        this.offset = this.offset + 100;
    }

    render() {
        const {results,handleModal,count} = this.props;

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
                        {results.map((recording,index)=><Recording {...recording} mbid={recording.id} key={recording.id} listNumber={index+1} handleModal={handleModal}/>)}
                    </tbody>
                </table>
                {results.length>0 ?<div className="text-center"> <button className="btn btn-primary" onClick={this.moreResults}> plus de résultas</button> </div> : <p className="text-center">Entrez un élément de recherche</p>}

            </div>
        );
    }
}

export default RecordingContainer;