import React, { useState } from 'react';

import ProfileLink from '../components/ProfileLink.js'

function Blog() {
  let userID = 'a2c60dovnNajfSG91rnB4UXmBlf2'
  return (
    <div>
      <p>
      This is the blog page.
      </p>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dolor nibh, fermentum porttitor pulvinar sed, lacinia a lorem. Sed iaculis augue vel dictum rhoncus. Suspendisse venenatis, tellus nec sollicitudin molestie, urna felis semper mi, vitae laoreet nulla mi rhoncus risus. Ut dictum mauris nec ornare fermentum. Donec vulputate felis in vestibulum fermentum. Etiam varius varius nunc sed pharetra. In in est libero. Aenean auctor at ante eu scelerisque. Vestibulum vitae convallis mauris. Nam risus nibh, pellentesque a lacus eget, accumsan ultricies arcu. Phasellus finibus risus a velit dapibus, eget laoreet erat maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris varius volutpat luctus. Integer tincidunt feugiat justo. Phasellus eu sem urna. Pellentesque eget vehicula enim.
      </p>
      <div><ProfileLink uid={userID}/></div>
    </div>
  );
}

export default Blog;
