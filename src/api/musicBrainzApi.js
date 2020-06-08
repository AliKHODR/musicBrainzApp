class Requests {
    async getRecordings(search='',choice='',offset){
        try{
            let queryString = '';
            if(choice === 'artist'){
                queryString = `* AND artist:"${search}"`
            }else if(choice === 'recording'){
                queryString = `* AND recording:"${search}"`
            }else if(choice === 'release'){
                queryString = `* AND release:"${search}"`
            }else{
                queryString =  `"${search}"`
            }
            queryString = encodeURIComponent(queryString);
            const response = await fetch(`https://musicbrainz.org/ws/2/recording?query=${queryString}&limit=100&offset=${offset}&fmt=json`);
            if(!response.ok)
                throw Error(response.statusText);
            return await response.json();
        }catch (e) {
            console.log(e)
        }
    }

    async getEntity(mbid=''){
        try{
            const response = await fetch(`https://musicbrainz.org/ws/2/recording/${mbid}?inc=ratings+genres+releases+artists&fmt=json`);
            if(!response.ok)
                throw Error(response.statusText);
            return await response.json();
        }catch (e) {
            console.log(e)
        }
    }

    async getCoverArt(id=''){
        try{
            const response = await fetch(`https://coverartarchive.org/release/${id}`);
            if(!response.ok)
                throw Error(response.statusText);
            return await response.json();
        }catch (e) {
            console.log(e)
        }
    }
}
export default new Requests();