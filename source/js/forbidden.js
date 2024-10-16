// 监听按键
document.onkeydown = function (event) {
  const { keyCode, ctrlKey, shiftKey } = event;

  // 禁用特定按键
  if (
    keyCode === 123 || // F12
    (ctrlKey && shiftKey && keyCode === 73) || // Ctrl + Shift + I
    (ctrlKey && keyCode === 83) || // Ctrl + S
    (ctrlKey && keyCode === 80) // Ctrl + P
  ) {
    event.preventDefault();
    hud.toast("请您尊重本站隐私", 2500);
    return false;
  }
};