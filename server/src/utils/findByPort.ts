import * as childProcess from 'child_process';

const split = (line: string, max: number) => {
  const cols = line.trim().split(/\s+/);

  if (cols.length > max) {
    cols[max - 1] = cols.slice(max - 1).join(' ');
  }

  return cols;
};

const stripLine = (text: string, num: number) => {
  let idx = 0;
  while (num-- > 0) {
    const nIdx = text.indexOf('\n', idx);
    if (nIdx >= 0) {
      idx = nIdx + 1;
    }
  }
  return idx > 0 ? text.substring(idx) : text;
};

const extractColumns = (text: string, idxes: number[], max: number) => {
  const lines = text.split(/(\r\n|\n|\r)/);
  const columns = [];
  if (!max) {
    max = Math.max.apply(null, idxes) + 1;
  }
  lines.forEach((line) => {
    const cols = split(line, max);
    const column = [];

    idxes.forEach((idx) => {
      column.push(cols[idx] || '');
    });

    columns.push(column);
  });

  return columns;
};

export default (port: number) => {
  const UNIT_MB = 1024 * 1024;
  return new Promise(async (resolve, reject) => {
    const cmd = 'netstat -tunlp';
    await childProcess.exec(
      cmd,
      {
        maxBuffer: UNIT_MB,
        windowsHide: true
      },
      (err, stdout, stderr) => {
        if (err) reject(err);

        const warn = stderr.toString().trim();
        if (warn) console.warn(warn);

        const data = stripLine(stdout.toString(), 2);
        const columns = extractColumns(data, [3, 6], 7).find((column) => {
          const matches = String(column[0]).match(/:(\d+)$/);
          if (matches && matches[1] === String(port)) {
            return true;
          }
        });
        if (columns && columns[1]) {
          const pid = columns[1].split('/', 1)[0];
          if (pid.length) {
            const pidNum = parseInt(pid, 10);
            process.kill(pidNum);
            console.log(`process on pid ${pidNum} was killed`);
            resolve(true);
          }
        } else {
          resolve(console.log(`pid of port (${port}) not busy`));
        }
      }
    );
  });
};
