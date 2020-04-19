import React from 'react';
import '../styles/Message.css'
const Message = (type = 'info', text = '', duration = 1000) =>{
  const containerId = 'message-container';
  let containerEl = document.getElementById(containerId);
  
  if (!containerEl) {
    // 创建一个Element对象，也就是创建一个id为message-container的dom节点
    containerEl = document.createElement('div');
    containerEl.id = containerId;
    // 把message-container元素放在html的body末尾
    document.body.appendChild(containerEl);
    let messageEl = document.createElement('div');
    // 设置消息class，这里加上move-in可以直接看到弹出效果
    messageEl.className = 'message move-in';
    // 消息内部html字符串
    messageEl.innerHTML = `
            <div class="text icon-${type}">${text}</div>
        `;
    // 追加到message-container末尾
    // containerEl属性是我们在构造函数中创建的message-container容器
    containerEl.appendChild(messageEl);
    setTimeout(() => {
      messageEl.className = messageEl.className.replace('move-in', '');
      // 增加一个move-out类
      messageEl.className += 'move-out';
      // 这个地方是监听动画结束事件，在动画结束后把消息从dom树中移除。
      // 如果你是在增加move-out后直接调用messageEl.remove，那么你不会看到任何动画效果
      messageEl.addEventListener('animationend', () => {
        // Element对象内部有一个remove方法，调用之后可以将该元素从dom树种移除！
        messageEl.remove();
        containerEl.remove();
      });
    }, duration);
  }
}

export default Message
