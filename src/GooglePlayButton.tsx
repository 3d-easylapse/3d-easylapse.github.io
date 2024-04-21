import React from 'react';

function GooglePlayButton(props: { style?: React.CSSProperties }) {
  return (
    <a href="https://play.google.com/store/apps/details?id=com.icarodlima.easylapse3d&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
      <img
        style={props.style}
        alt="Get it on Google Play"
        src="en_badge_web_generic.png"
      />
    </a>
  );
}

export default GooglePlayButton;
