export function scrollToBottom() {

  const chat = document.querySelector('ul.messages-list');

  chat.scrollTo(0, chat.scrollHeight);
}