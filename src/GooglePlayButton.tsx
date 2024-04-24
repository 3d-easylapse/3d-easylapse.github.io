import React from 'react';

function GooglePlayButton(props: { style?: React.CSSProperties }) {
  return (
    <a href="https://play.google.com/store/apps/details?id=com.icarodlima.easylapse3d">
      <img
        style={props.style}
        alt="Get it on Google Play"
        src="en_badge_web_generic.png"
      />
    </a>
  );
}

export default GooglePlayButton;
