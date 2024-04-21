function AppStoreButton(props: { style?: React.CSSProperties }) {
  return (
    <img
      style={{ ...props.style, cursor: 'pointer' }}
      src="download-on-the-app-store-under-construction.png"
      alt="Download on the App Store"
      onClick={() =>
        window.alert('Sorry, iOS app still in development, come back later.')
      }
    />
  );
}

export default AppStoreButton;
