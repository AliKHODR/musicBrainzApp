import React, {PureComponent} from 'react';

class Recording extends PureComponent {

    render() {
        const {title,listNumber,id,releases,handleModal} =  this.props;
        let album,artist = null;
        if(Array.isArray(releases) && releases.length > 0 && releases[0].hasOwnProperty('title')) {
            album = releases[0].title;
        }
        if(this.props.hasOwnProperty('artist-credit') &&
            Array.isArray(this.props['artist-credit']) &&
            this.props['artist-credit'].length > 0 &&
            this.props['artist-credit'][0].hasOwnProperty('name')) {
            artist = this.props['artist-credit'][0].name;
        }
        return (
            <tr>
                <td>{listNumber}</td>
                <th>{artist}</th>
                <td>{title}</td>
                <td>{album}</td>
                <td className="plus radius" onClick={()=>{handleModal(id)}}> </td>
            </tr>
        );
    }
}

export default Recording;