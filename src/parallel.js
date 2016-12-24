import async from 'async';

async.parallel([
      (done)=>{
        setTimeout(()=>{
          console.log('第一次执行');
          done(null,'1');
        },1000);

      },
      (done)=>{
        console.log('第二次执行');
        done(null,'2');
      },
      (done)=>{
        console.log('第三次执行');
        done(null,'3');
      }
    ],(err,result)=>{
      if(err){
        console.log('有错误了，结果是：'+result+'\n')
  }else {
    console.log('没有错误结果是：'+result+'\n')
  }
});
//输出结果是这样的
//第二次执行
//第三次执行
//第一次执行
//没有错误结果是：1,2,3体现并发
async.parallel([
  (done)=>{
    setTimeout(()=>{
      console.log('第一次执行');
      done(null,'1');
    },1000);

  },
  (done)=>{
    console.log('第二次执行');
    done(true,'2');
  },
  (done)=>{
    console.log('第三次执行');
    done(null,'3');
  }
],(err,result)=>{
  if(err){
    console.log('有错误了，结果是：'+result+'\n')
  }else {
    console.log('没有错误结果是：'+result+'\n')
  }
});

//第二次执行
//有错误了，结果是：,2

//第三次执行
//第一次执行
