import { Cloudinary, CloudinaryVideo } from '@cloudinary/url-gen';
import * as cloudinary from 'cloudinary';

// Import the scale mode from the resize action.
import { scale } from '@cloudinary/url-gen/actions/resize';


// 2. mp4da

export default () => {
  // Create and configure your Cloudinary instance.
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: 'drypohi9s',
  //     apiKey: '389773339593115',
  //     apiSecret: '1cCHmxR_vQI8ggW-Vrh7SZjfb_E'
  //   },
  //   url: {
  //     secure: true,
  //   }
  // });
  // const myVideo = cld.video('v1634301118/music_app/audio/d3f3skenivcmhhc4q6mm.mp3');
  // // const transformAudio = myVideo.transformation.addFlag('streaming_attachment').delivery()
  // // const transformAudio = myVideo.transformation.addFlag('streaming_attachment')
  // // const myURL = myVideo.toURL();
  // const myURL = myVideo.transcode();
  // console.log('myURL', myURL)
  // return myURL
  // ---------------------------------------------------------------------------------
  // cloudinary?.v2.config({
  //   apiKey: '389773339593115',
  //   cloudName: 'drypohi9s',
  //   apiSecret: '1cCHmxR_vQI8ggW-Vrh7SZjfb_E',
  //   secure: true
  // });
  // const uploadConfig = {
  //   resourse_type: 'video',
  //   eager: [
  //     {
  //       streaming_profile: 'full_hd',
  //       format: 'mp4da'
  //     }
  //   ],
  //   eager_async: true,
  //   eager_notification_url:
  //     'http://res.cloudinary.com/drypohi9s/video/upload/v1634301118/music_app/audio/',
  //   public_id: 'd3f3skenivcmhhc4q6mm'
  // };
  // v2.uploader.upload('d3f3skenivcmhhc4q6mm.mp3', uploadConfig, (result) =>
  //   console.log('d3f3skenivcmhhc4q6mm', result)
  // );
};
// "https://res.cloudinary.com/drypohi9s/video/upload/elephants?_a=ATADJAA0"
// "http://res.cloudinary.com/drypohi9s/video/upload/v1634301118/music_app/audio/d3f3skenivcmhhc4q6mm.mp3"
// "https://res.cloudinary.com/drypohi9s/video/upload/fl_streaming_attachment/v1634301118/music_app/audio/d3f3skenivcmhhc4q6mm?_a=ATADJAA0"
