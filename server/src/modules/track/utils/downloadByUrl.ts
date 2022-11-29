// import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
// import * as uuid from 'uuid';
// import * as path from 'path';
// import * as fs from 'fs';
// import * as fileFormats from 'file-formats';
// import nodeFetch from 'node-fetch';

// export default (url: string | undefined, name?: string, ext?: string) =>
//   new Promise((resolve, reject) => {
//     if (!url) {
//       reject(new Error('Url path is not found'));
//       return;
//     }
//     const audioExtentions = fileFormats.list();
//     audioExtentions.push('.m4a');
//     const isAudioFormat = audioExtentions.some((el) => el === `.${ext}`);
//     nodeFetch(url)
//       .then((responseFile) => {
//         if (!responseFile.ok) {
//           reject(
//             new HttpException(
//               {
//                 error: `Error by query: ${responseFile.url}`,
//                 message: false
//               },
//               HttpStatus.NOT_FOUND
//             )
//           );
//         }

//         const passStream = responseFile.body; // PassThrough;
//         const fileName = `${name || ''}_${uuid.v4()}.${
//           isAudioFormat ? ext : 'jpg'
//         }`;
//         const filePath = path.resolve(
//           __dirname,
//           '../../../',
//           'assets',
//           fileName
//         );
//         passStream.on('data', (chunk) => {
//           fs.appendFileSync(filePath, chunk);
//           console.log(`Received ${chunk.length} bytes of data.`);
//         });
//         passStream.on('end', () => {
//           console.log('END');
//           resolve(filePath);
//         });

//         passStream.on('error', (err) => reject(err));
//       })
//       .catch((e) => {
//         throw new NotFoundException(e);
//       });
//   });
