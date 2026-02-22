// Client-side script injected to spoof canvas and other browser fingerprinting APIs
export const FINGERPRINT_SPOOF_SCRIPT = `
(function() {
  // Canvas Spoofing
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type, contextAttributes) {
    const context = originalGetContext.apply(this, arguments);
    if (type === '2d' && context) {
      const originalGetImageData = context.getImageData;
      context.getImageData = function() {
        const imageData = originalGetImageData.apply(this, arguments);
        // Slightly modify a random pixel to change the canvas hash
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (Math.random() < 0.001) {
            imageData.data[i] = (imageData.data[i] + 1) % 255;
          }
        }
        return imageData;
      };
      
      const originalToDataURL = this.toDataURL;
      this.toDataURL = function() {
        // Change one pixel before exporting
        const ctx = originalGetContext.call(this, '2d');
        if (ctx) {
          ctx.fillStyle = \`rgba(\${Math.floor(Math.random() * 255)}, 0, 0, 0.01)\`;
          ctx.fillRect(0, 0, 1, 1);
        }
        return originalToDataURL.apply(this, arguments);
      };
    }
    return context;
  };

  // Prevent WebRTC IP leaks
  if (typeof RTCPeerConnection !== 'undefined') {
    const originalRTCPeerConnection = window.RTCPeerConnection;
    window.RTCPeerConnection = function(...args) {
      const pc = new originalRTCPeerConnection(...args);
      pc.createDataChannel = function() { return null; };
      return pc;
    };
  }
})();
`;
