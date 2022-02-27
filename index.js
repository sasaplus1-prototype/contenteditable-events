(() => {
  // index.ts
  function main() {
    const editor = document.getElementById("js-editor");
    if (!editor) {
      return;
    }
    const pseudoConsole = document.getElementById("js-console");
    const originalConsoleLog = console.log;
    console.log = function(...args) {
      originalConsoleLog.apply(console, args);
    };
    function onEvent(event) {
      console.log(event.type, event);
      const preventCheckbox = document.querySelector("#js-prevent-" + event.type);
      if (preventCheckbox && preventCheckbox.checked) {
        event.preventDefault();
        console.log("prevent " + event.type);
      }
    }
    editor.addEventListener("beforeinput", onEvent, false);
    editor.addEventListener("blur", onEvent, false);
    editor.addEventListener("compositionend", onEvent, false);
    editor.addEventListener("compositionstart", onEvent, false);
    editor.addEventListener("compositionupdate", onEvent, false);
    editor.addEventListener("focus", onEvent, false);
    editor.addEventListener("focusin", onEvent, false);
    editor.addEventListener("focusout", onEvent, false);
    editor.addEventListener("input", onEvent, false);
    editor.addEventListener("keydown", onEvent, false);
    editor.addEventListener("keyup", onEvent, false);
    editor.addEventListener("paste", onEvent, false);
    editor.addEventListener("selectstart", onEvent, false);
    document.addEventListener("selectionchange", onEvent, false);
    const insert = document.getElementById("js-insert");
    const insertText = document.getElementById("js-insert-text");
    const useExecCommand = document.getElementById("js-use-exec-command");
    if (editor && insert && insertText && useExecCommand) {
      insert.addEventListener("click", function(event) {
        event.preventDefault();
        editor.focus();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          if (useExecCommand.checked) {
            document.execCommand("InsertHTML", false, insertText.value);
          } else {
            const range = selection.getRangeAt(0);
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(insertText.value, "text/html");
            range.insertNode(...doc.body.childNodes);
          }
        }
      }, false);
    }
  }
  main();
})();
//# sourceMappingURL=index.js.map
