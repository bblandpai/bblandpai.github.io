interface Window {
  FB: any;
  fbAsyncInit: () => void;
  // google tag
  gtag: (command: string, trackingId: string, config?: object) => void;
  // MSStream for older Internet Explorer versions
  MSStream: any;
}