var Viatges = (function(){
    let experiencies = [
        {
            id: 1,
            titol: 'Viatge Albània, Kosovo i Macedònia en grup. Nadal',
            data: '01/12/2020',
            text: 'blabla albania, kosovo i macedonia',
            imatge: 'imgAlbania.jpg',
            coordenades: '40.724327, 19.586418',//40°43'27.6"N 19°35'11.1"E
            categoria: 'historic',
            likes: 4,
            dislikes: 10,
            estat: 'publicada'
        },
        {
            id: 2,
            titol: 'Viatge Tanzània Safari Nord i Natron. Nadal',
            data: '02/12/2020',
            text: 'blabla tanzania',
            imatge: 'imgTanzania.jpg',
            coordenades: '-2.450819, 32.902157',//2°27'03.0"S 32°54'07.8"E
            categoria: 'aventures',
            likes: 9,
            dislikes: 9,
            estat: 'publicada'
        },
        {
            id: 3,
            titol: 'Viatge Costa Rica en grup. Nadal',
            data: '03/12/2020',
            text: 'blabla costarica',
            imatge: 'imgCostarica.jpg',
            coordenades: '9.381387, -84.145301',//9°22'53.0"N 84°08'43.1"W
            categoria: 'romantic',
            likes: 10,
            dislikes: 4,
            estat: 'publicada'
        },
        {
            id: 4,
            titol: 'Viatge Líban Clàssic 10 Dies. Nadal',
            data: '04/12/2020',
            text: 'blabla liban',
            imatge: 'imgLiban.jpg',
            coordenades: '33.902952, 35.492856',//33°54'10.6"N 35°29'34.3"E
            categoria: 'historic',
            likes: 15,
            dislikes: 2,
            estat: 'publicada'
        },
        {
            id: 5,
            titol: 'Viatge Emirats Àrabs en grup. Nadal',
            data: '05/12/2020',
            text: 'blabla Emirats Àrabs',
            imatge: 'imgEmiratsarabs.jpg',
            coordenades: '24.490505, 54.352267',//24°29'25.8"N 54°21'08.2"E
            categoria: 'romantic',
            likes: 2,
            dislikes: 15,
            estat: 'publicada'
        },
        {
            id: 6,
            titol: 'Líban Trekking 8 Dies. Nadal',
            data: '06/12/2020',
            text: 'blabla liban trekking',
            imatge: 'imgLibantreking.jpg',
            coordenades: '34.438768, 36.012988',//34°26'19.6"N 36°00'46.8"E
            categoria: 'muntanyisme',
            likes: 15,
            dislikes: 2,
            estat: 'publicada'
        },
        {
            id: 7,
            titol: 'Viatge Grècia en grup. Nadal',
            data: '07/12/2020',
            text: 'blabla Grecia',
            imatge: 'imgGrecia.jpg',
            coordenades: '37.971790, 23.726150',//37°58'18.4"N 23°43'34.1"E
            categoria: 'historic',
            likes: 13,
            dislikes: 6,
            estat: 'publicada'
        },
        {
            id: 8,
            titol: "Viatge Sèrbia en grup. Ciutats i parcs de l'antiga Iugoslàvia. Nadal",
            data: '08/12/2020',
            text: 'blabla Serbia',
            imatge: 'imgSerbia.jpg',
            coordenades: '44.817852, 20.445447',//44°49'04.3"N 20°26'43.6"E
            categoria: 'historic',
            likes: 2,
            dislikes: 18,
            estat: 'publicada'
        },  
        {
            id: 9,
            titol: 'Viatge Sudan en grup. Nadal',
            data: '09/12/2020',
            text: 'blabla Sudan',
            imatge: 'imgSudan.jpg',
            coordenades: '19.568996, 37.240980',//19°34'08.4"N 37°14'27.5"E
            categoria: 'aventures',
            likes: 0,
            dislikes: 0,
            estat: 'esborrany'
        },
        {
            id: 10,
            titol: 'Viatge al Raval en grup. Nadal',
            data: '10/12/2020',
            text: 'blabla Raval sucks',
            imatge: 'imgRaval.jpg',
            coordenades: '41.378704, 2.170521',//41°22'43.3"N 2°10'13.9"E
            categoria: 'aventures',
            likes: 0,
            dislikes: 0,
            estat: 'rebutjada'
        }
    ]

    function getExperiencies(){
        return experiencies;
    }

    return {
        experienciesDB: getExperiencies
    };

})();