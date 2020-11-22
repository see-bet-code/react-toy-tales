import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map((toy) => <ToyCard key={toy.id} toy={toy} handleDeleteToy={props.handleDeleteToy} incrementLikes={props.incrementLikes}/>)}
    </div>
  );
}

export default ToyContainer;
