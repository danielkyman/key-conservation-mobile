import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function Plus(props) {
  const plus = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"/></svg>`;
  const Plus = () => (
    <SvgXml xml={plus} width="20" height="20" fill="#000" {...props} />
  );

  return <Plus />;
}
