import React, {PureComponent} from 'react';
import Requests from '../api/musicBrainzApi';

class ActionModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            entity : {},
            releasesId : [],
            images : [],
            isLoading : true
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const{show,entityId} = this.props
        const{releasesId} = this.state
        if(show && prevProps.entityId !== entityId ) {
            Requests.getEntity(entityId).then(res => {
                if (res.hasOwnProperty('releases') && Array.isArray(res.releases)) {
                    //this.releasesId = res.releases.map(r=>r.id);
                    this.setState({
                        entity: res,
                        releasesId: res.releases.map(r => r.id)
                    });
                }
            }).catch(e=>console.log(e));
        }
        //console.log('releasesId', this.releasesId);
        if (prevState.releasesId !== releasesId) {
            const promises = Promise.all(releasesId.map(id=>Requests.getCoverArt(id)));
            promises.then(data => {
                let coverArt = []
                data.map((obj) => {
                    if(obj && obj.hasOwnProperty('images')){
                        return coverArt = [...coverArt,...obj.images]
                    }
                    return null
                })
                this.setState({
                    isLoading:false,
                    images : coverArt
                })
            }).catch(e=>console.log(e));
        }
    }

    closeModal = ()=>{
        this.setState({
            isLoading : true,
            images:[]
        })
        this.props.handleModal();
    }

    render() {
        const {show} = this.props;
        const {entity,images,isLoading} = this.state;
        console.log(entity)
        let artist,releases,genre,lengthInSeconds,rating = null;
        if(entity.hasOwnProperty('releases') && Array.isArray(entity.releases) && entity.releases.length > 0){
            releases = entity.releases.map(r => r.title);
            releases = releases.filter((item,pos)=> releases.indexOf(item) === pos)
        }
        if(entity.hasOwnProperty('genres') && Array.isArray(entity.genres) && entity.genres.length > 0 && entity.genres[0].hasOwnProperty('name')){
            genre = entity.genres[0].name;
        }
        if(entity.hasOwnProperty('length') && entity.length){
            lengthInSeconds = entity.length/1000;
        }
        if(entity.hasOwnProperty('rating') && entity.rating.hasOwnProperty('value') && entity.rating.value){
            rating =entity.rating.value;
        }
        if(entity.hasOwnProperty('artist-credit') &&
            Array.isArray(entity['artist-credit']) &&
            entity['artist-credit'].length > 0 &&
            entity['artist-credit'][0].hasOwnProperty('name')){
            artist = entity['artist-credit'][0].name;
        }
        const spinner = <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>;
        </div>
        return (
            <div className={'modal'+(show ?' show':'')} id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{entity.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Titre : {entity.title}</p>
                            <p>Artistes :{artist && artist} </p>
                            <p>{releases && `Albums : ${releases.map(r =>`${r}`)}`}</p>
                            <p>{genre && `Genre : ${genre}` }</p>
                            <p> {`Durée :${Math.floor(lengthInSeconds/60)}m${Math.round(lengthInSeconds%60)}s` } </p>
                            <p>{rating && `Rating : ${rating}/5`} </p>
                            <h5>Cover Arts</h5><hr></hr>
                            {isLoading && spinner }
                            {images.map((i,index) =><img src={i.thumbnails.small} key={index} alt='album'/>)}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActionModal;