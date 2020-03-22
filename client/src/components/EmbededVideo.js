import React, { useState } from 'react';


// TODO make the height and width scalable for mobile users
function EmbededVideo (props) {

  return (
    <iframe width='560' height='315' src={'https://www.youtube.com/embed/' + props.youtubeId} frameborder='0' allow='accelerometer; encrypted-media; gyroscope; picture-in-picture' allowfullscreen />
  );
}

export default EmbededVideo;
