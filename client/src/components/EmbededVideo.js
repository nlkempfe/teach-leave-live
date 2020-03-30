import React, { useState } from 'react';


/*
Provides an embeded youtube video that fills its container and matches an aspect ratio
Provide props.aspectRatio to specify the aspect ratio (e.g. 16.0/9.0)
Default aspect ratio is 16.0/9.0 if props.aspect ratio is not provided
*/
function EmbededVideo (props) {

  /*Calculate inverse of aspect ratio and convert into a percentage*/
  const inverseAspectRatio = ((props.aspectRatio ? 1.0/props.aspectRatio : 9.0/16.0) * 100) + '%'

  const container_style = {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: inverseAspectRatio
  };

  const iframe_style = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '0'
  };

  return (
    <div style = {container_style}>
      <iframe style = {iframe_style} src={'https://www.youtube.com/embed/' + props.youtubeId} frameborder='0' allowfullscreen />
    </div>
  );
}

export default EmbededVideo;
