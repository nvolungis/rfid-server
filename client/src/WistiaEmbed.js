import React, { useEffect, useRef } from 'react';
import useScript from './useScript';

const WistiaEmbed = ({ hashedId, onEnd = () => {} }) => {
  const url = 'https://fast.wistia.com/assets/external/E-v1.js'
  const [loaded, error] = useScript(url);
  const swatchRef = useRef();
  const handle = useRef();

  useEffect(() => {
    if (handle.current) {
      handle.current.replaceWith(hashedId);
    } else {
      window._wq = window._wq || [];
      window._wq.push({
        id: hashedId,
        onReady: h => {
          handle.current = h;
          h.bind('end', () => {
            onEnd();
          });
        },
      });
    }
  }, [hashedId, onEnd]);

  return (
    <div
      className="wistia_responsive_padding"
      style={{
        padding:'56.25% 0 0 0',
        position: 'relative',
      }}
    >
      <div
        className="wistia_responsive_wrapper"
        style={{
          height:'100%',
          left:0,
          position: 'absolute',
          top:0,
          width: '100%',
        }}
      >
        <div
          className={`wistia_embed wistia_async_${hashedId} videoFoam=true autoPlay=true`}
          style={{
            height: '100%',
            position: 'relative',
            width: '100%',
          }}
        >
          <div
            ref={swatchRef}
            className="wistia_swatch"
            style={{
              height:'100%',
              left:0,
              opacity:0,
              overflow: 'hidden',
              position:'absolute',
              top:0,
              transition:'opacity 200ms',
              width: '100%',
            }}
          >
            <img
              src={`https://fast.wistia.com/embed/medias/${hashedId}/swatch`}
              style={{
                filter:'blur(5px)',
                height:'100%',
                objectFit:'contain',
                width:'100%',
              }}
              onLoad={() => swatchRef.current.style.opacity=1 } />
          </div>
        </div>
      </div>
    </div>
  );

};

export default WistiaEmbed;

