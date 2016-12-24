import async from 'async';

async.parallelLimit([
  (done) => {
    setTimeout(() => {
      console.log('第一次执行');
      done(null, '1');
    }, 1000);
  },
  (done) => {
    console.log('第二次执行');
    done(null, '2');
  },
  (done) => {
    console.log('第三次执行');
    done(null, '3');
  }
], 1,(err, result) => {
  if (err) {
    console.log('有错误了，结果是：' + result + '\n')
  } else {
    console.log('没有错误结果是：' + result + '\n')
  }
});
//第一次执行
//第二次执行
//第三次执行
//没有错误结果是：1,2,3