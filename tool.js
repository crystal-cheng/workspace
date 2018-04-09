/**
 * Created by crystal.cheng on 2017/11/27.
 */
function setResult(tag, content, color) {
    if(tag && typeof tag == 'object') {
        tag.innerHTML = content;
        tag.style.color = color;
    }
}

var validateEmail = function (e) {
    // 邮箱正则
    var reg = /^[a-z0-9]+(\w|_)+@+([a-z0-9]){2,4}.[a-z]{2,4}$/;
    var currentValue = e.target.value;
    var resultTag = document.getElementById('resultEmail'),
        content = reg.test(currentValue) ? '邮箱正确' : '请输入正确的邮箱',
        color = reg.test(currentValue) ? 'green' : 'red';
    setResult(resultTag, content, color);
}

var validateMobile = function (e) {
    // 手机号正则
    var reg = /^1(3|4|5|7|8){1}[0-9]{9}$/
    var currentValue = e.target.value;
    var resultTag = document.getElementById('resultMobile'),
        content = reg.test(currentValue) ? '手机号正确' : '请输入正确的手机号',
        color = reg.test(currentValue) ? 'green' : 'red';
    setResult(resultTag, content, color);
}

// 防抖
function debounce(func, wait) {
    var timeOut;

    return function () {
        if(timeOut) {
            clearTimeout(timeOut);
        }
        // 保存this上下文，参数
        var that = this, args = arguments;
        timeOut = setTimeout(function () {
            func.apply(that, args);
        }, wait)
    }
}

document.getElementById('emailIpt').onkeyup = debounce(validateEmail, 1000);
document.getElementById('mobileIpt').onkeyup = debounce(validateMobile, 1000);

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
网站常用方法
1.返回顶部
   $(function(){
        $('.top').hide();
        $(window).scroll(function() {       
             if($(window).scrollTop() >= 100){
                $('.top').fadeIn(300); 
                 }else{  $('.top').fadeOut(300);
         });
        $('.top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
     })；
2.点击锚点移动到对应的位置
   $(".aa").click(function(event){
        event.preventDefault(); //取消事件的默认动作。
        $('html,body').animate({scrollTop:$(this.hash).offset().top},800);
   });
3.判断页面加载是否完成
   document.onreadystatechange = loadingChange;//当页面加载状态改变的时候执行这个方法.  
        function loadingChange() {   
            if(document.readyState == "complete"){ //当页面加载状态为完全结束时进入   
                $(".loading").hide();//当页面加载完成后将loading页隐藏  
                window.location.href="http://www.baidu.com";
            }   
        }
4.禁止鼠标右键
   $(document).ready(function(){
        $(document).on("contextmenu",function(e){
             return false;
         });
    });
5.判断是pc端还是移动端
    function getClientInfo(){  
         var banner=document.getElementById('banner');
         var userAgentInfo = navigator.userAgent;  
         var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
         var agentinfo = null;  
         for (var i = 0; i < Agents.length; i++) {  
                   if (userAgentInfo.indexOf(Agents[i]) > 0) { agentinfo = userAgentInfo; break; }  
         }  
         if(agentinfo){
                   $('.banner').css('height','auto');
                    banner.style.height='auto'
                   }else{
                        $('.banner').css($(window).height());
                        banner.style.height=document.body.clientHeight
                   }     
        }
6.判断是否是ie浏览器
   function isIE() { //ie?    
       if (!!window.ActiveXObject || "ActiveXObject" in window){
              return true;
         }else{}         
          return false;  
     } 
7、返回上一页
方法一、以按钮点击的方式实现：
           <input type="button" name="Submit" value="返回上一页" onclick="javascript:window.history.back(-1);">
           或者
           <input type="button" name="Submit" value="返回上一页" onclick="javascript:history.back(-1);">
方法二、以图片点击的方式实现：
           <img src="图片的路径" onclick="javascript:window.history.back(-1);" title="返回上一页" alt="返回点击图片" />
           或者
           <img src="图片的路径" onclick="javascript:history.back(-1);" title="返回上一页" alt="返回点击图片" />
方法三、文字点击的方式实现：
           <a href="javascript:history.back(-1)">返回上一页</a>
          或者
          <a href="#" onClick="javascript:history.back(-1);">返回上一页</a>

方法四、图片链接的方式实现：
          <a href="javascript:window.history.back(-1)" target="_self"><img src="图片的路径" /></a>
          或者
         <a href="javascript:history.back(-1)" target="_self"><img src="图片的路径" /></a>
方法五、过几秒钟后返回上一页代码：
         <script language="javascript">setTimeout("window.history.go(-1)",3000)</script> 
         或者
        <script language="javascript">setTimeout("history.go(-1)",3000)</script>
