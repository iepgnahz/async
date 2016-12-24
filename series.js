import async from 'async';

async.series([
  (done)=>{
      console.log('第一次执行');
      done(null,'1');
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

});  //执行结果：'没有错误结果是：['1','2','3']

async.series([
  (done)=>{
    console.log('第一次执行');
    done(null,'1');
  },
  (done)=>{
    console.log('第二次执行');
    done(null,'2');
  },
  (done)=>{
    console.log('第三次执行');
    done(true,'3');
  }
],(err,result)=>{
  if(err){
    console.log('有错误了，结果是：'+result+'\n')
  }else {
    console.log('没有错误结果是：'+result+'\n')
  }

});//执行结果：'有错误了，结果是：['1','2','3']

async.series([
  (done)=>{
    console.log('第一次执行');
    done(null,'1');
  },
  (done)=>{
    console.log('第二次执行');
    done(null);
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
});//执行结果：'没有错误结果是：['1',,'3']



