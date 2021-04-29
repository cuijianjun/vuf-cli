const cp = require('child_process');
const path = require('path')

// cp.exec('ls -al', function(err, stdout, stderr) {
//   console.log(err);
//   console.log(stdout);
//   console.log(stderr);
// })

// cp.execFile(path.resolve(__dirname, 'test.shell'),['-al', '-bl'], function(err, stdout, stderr) {
//   console.log(err);
//   console.log(stdout);
//   console.log(stderr);
// })

// const child = cp.spawn(path.resolve(__dirname, 'test.shell'), ['-al', '-bl'], {
//   cwd: path.resolve('..')
// })


// console.log(child.pid, process.pid);

// child.stdout.on('data', function(chunk) {
//   console.log('stdout',chunk.toString());
// })

// child.stderr.on('data', function(chunk) {
//   console.log('stderr', chunk.toString());
// })
// // spawn ： 耗时任务（比如：npm install）,需要不断日志
// const child = cp.spawn('npm', ['install'], {
//   cwd: path.resolve('/Users/cuijianjun/Desktop/vue-test/imooc-test-lib')
// })
// exec/execFile: 开销比较小的任务

// fork: Node
 
// const child = cp.fork(path.resolve(__dirname, 'child.js'));
// child.send('hello child process!', () => {
//   // child.disconnect();
// });
// child.on('message', (msg) => {
//   console.log(msg);
// })
// console.log('main pid:', process.pid);

const ret = cp.execSync('ls -al|grep node_modules');
console.log(ret.toString());

const ret2 = cp.execFileSync('ls', ['-al']);
console.log(ret2.toString());

const ret3 = cp.spawnSync('ls', ['-al']);
console.log(ret3.stdout.toString());