/* eslint-disable react-refresh/only-export-components */
import React from 'react';

function Title  () {
  console.log('rendering title');
  return <h2>useCallback hook</h2>
}

export default React.memo(Title)
