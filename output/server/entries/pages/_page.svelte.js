import { J as once, K as ensure_array_like, E as attr, M as spread_attributes, D as pop, A as push } from "../../chunks/index.js";
import { u as userStore } from "../../chunks/user.js";
import "../../chunks/client.js";
import "clsx";
import { nanoid } from "nanoid";
import "dequal";
import "../../chunks/create.js";
function createSubscriber(_) {
  return () => {
  };
}
function isFunction(value) {
  return typeof value === "function";
}
function isHtmlInputElement(element) {
  return element instanceof HTMLInputElement;
}
function extract(value, defaultValue) {
  if (isFunction(value)) {
    const getter = value;
    const gotten = getter();
    return gotten ?? defaultValue ?? gotten;
  }
  return value ?? defaultValue ?? value;
}
const defaultWindow = void 0;
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window: window2 = defaultWindow,
      document: document2 = window2?.document
    } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement();
function dataAttr(value) {
  return value === true ? "" : value === false ? void 0 : value;
}
function disabledAttr(value) {
  return value === true ? true : void 0;
}
function keys(obj) {
  return Object.keys(obj);
}
function createDataIds(name, parts) {
  return parts.reduce((acc, part) => {
    acc[part] = `data-melt-${name}-${part}`;
    return acc;
  }, {});
}
function createIds(identifiers2) {
  const id = nanoid();
  return Object.keys(identifiers2).reduce((acc, key) => {
    acc[key] = `${key}-${id}`;
    return acc;
  }, {});
}
function createBuilderMetadata(name, parts) {
  const dataAttrs = createDataIds(name, parts);
  const dataSelectors = keys(dataAttrs).reduce((acc, key) => {
    acc[key] = `[${dataAttrs[key]}]`;
    return acc;
  }, {});
  return {
    dataAttrs,
    dataSelectors,
    createIds: () => createIds(dataAttrs)
  };
}
createBuilderMetadata("accordion", [
  "root",
  "item",
  "trigger",
  "heading",
  "content"
]);
function inBrowser() {
  return typeof window !== "undefined";
}
createDataIds("avatar", ["image", "fallback"]);
class Synced {
  #internalValue;
  #valueArg;
  #onChange;
  #defaultValue;
  constructor({ value, onChange, ...args }) {
    this.#valueArg = value;
    this.#onChange = onChange;
    this.#defaultValue = "defaultValue" in args ? args?.defaultValue : void 0;
    this.#internalValue = extract(value, this.#defaultValue);
  }
  get current() {
    return isFunction(this.#valueArg) ? this.#valueArg() ?? this.#defaultValue ?? this.#internalValue : this.#internalValue;
  }
  set current(value) {
    if (this.current === value) return;
    if (isFunction(this.#valueArg)) {
      this.#onChange?.(value);
      return;
    }
    this.#internalValue = value;
    this.#onChange?.(value);
  }
}
createBuilderMetadata("collapsible", ["trigger", "content"]);
createBuilderMetadata("fileupload", ["dropzone", "input"]);
const identifiers = createDataIds("pin-input", ["root", "input"]);
function validateInput(char, type) {
  switch (type) {
    case "alphanumeric":
      return /^[a-zA-Z0-9]$/.test(char);
    case "numeric":
      return /^[0-9]$/.test(char);
    case "text":
      return true;
  }
}
function setInputSelectionRange(input, start, end) {
  setTimeout(() => {
    if (input.value.length === 0) return;
    if (input.selectionStart === start && input.selectionEnd === end) return;
    input.setSelectionRange(start, end);
  });
}
class PinInput {
  #id = nanoid();
  /* Props */
  #props;
  #maxLength = once(() => extract(this.#props.maxLength, 4));
  get maxLength() {
    return this.#maxLength();
  }
  #placeholder = once(() => extract(this.#props.placeholder, "○"));
  get placeholder() {
    return this.#placeholder();
  }
  #disabled = once(() => extract(this.#props.disabled, false));
  get disabled() {
    return this.#disabled();
  }
  #mask = once(() => extract(this.#props.mask, false));
  get mask() {
    return this.#mask();
  }
  #type = once(() => extract(this.#props.type, "text"));
  get type() {
    return this.#type();
  }
  #allowPaste = once(() => extract(this.#props.allowPaste, true));
  get allowPaste() {
    return this.#allowPaste();
  }
  /* State */
  #value;
  #focusedIndex = -1;
  #isFilled = once(() => this.value.length === this.maxLength);
  get isFilled() {
    return this.#isFilled();
  }
  constructor(props = {}) {
    this.#value = new Synced({
      value: props.value,
      onChange: props.onValueChange,
      defaultValue: ""
    });
    this.#props = props;
  }
  #getInputEls() {
    if (!inBrowser()) return [];
    const rootEl = document.getElementById(this.#id);
    if (!rootEl) return [];
    return [
      ...rootEl.querySelectorAll(`[${identifiers.input}]`)
    ].filter(isHtmlInputElement);
  }
  get value() {
    return this.#value.current;
  }
  set value(value) {
    this.#value.current = value;
    const inputs = this.#getInputEls();
    inputs.forEach((input, index) => {
      input.value = value[index] ?? "";
    });
  }
  /** The root element's props. */
  get root() {
    return {
      [identifiers.root]: "",
      id: this.#id,
      "data-complete": dataAttr(this.isFilled)
    };
  }
  /** An array of props that should be spread to the input elements. */
  get inputs() {
    return Array(this.maxLength).fill(0).map((_, index) => this.#getInput(index));
  }
  #deleteCharAtIndex(index) {
    this.value = this.value.slice(0, index) + this.value.slice(index + 1);
  }
  #addCharAtIndex(char, index) {
    this.value = this.value.slice(0, index) + char + this.value.slice(index + 1);
  }
  #getInput(index) {
    const currValue = this.value[index];
    const isFilled = currValue !== void 0;
    const isFocused = this.#focusedIndex === index;
    const isLast = index === this.maxLength - 1;
    const canFocus = this.isFilled && isLast || index === this.value.length;
    const onpaste = (pasted) => {
      if (!this.allowPaste) return;
      const inputs = this.#getInputEls();
      if (!inputs.length) return;
      const focusedIndex = Math.max(this.#focusedIndex, 0);
      const initialIndex = pasted.length >= inputs.length ? 0 : focusedIndex;
      const lastIndex = Math.min(initialIndex + pasted.length, inputs.length);
      const valid = pasted.split("").every((char) => validateInput(char, this.type));
      if (!valid) {
        this.#props.onError?.({
          method: "paste",
          message: `Input did not match the type ${this.type}`
        });
        return;
      }
      for (let i = initialIndex; i < lastIndex; i++) {
        const input = inputs[i];
        if (!input) continue;
        input.value = pasted[i - initialIndex] ?? "";
        this.#addCharAtIndex(pasted[i - initialIndex] ?? "", i);
      }
      inputs[lastIndex]?.focus();
    };
    return {
      [identifiers.input]: "",
      placeholder: isFocused ? void 0 : this.placeholder,
      disabled: disabledAttr(this.disabled),
      type: this.mask ? "password" : "text",
      "data-filled": dataAttr(isFilled),
      tabindex: canFocus ? 0 : -1,
      inputmode: this.type === "numeric" ? "numeric" : "text",
      style: canFocus && isFocused && !isFilled ? void 0 : "caret-color: transparent;",
      onkeydown: (e) => {
        const el = e.target;
        if (!isHtmlInputElement(el)) {
          return;
        }
        const inputs = this.#getInputEls();
        switch (e.key) {
          case "ArrowLeft": {
            e.preventDefault();
            inputs[index - 1]?.focus();
            break;
          }
          case "ArrowRight": {
            if (!this.value[index]) return;
            e.preventDefault();
            inputs.at(index + 1)?.focus();
            break;
          }
          case "Home": {
            e.preventDefault();
            inputs[0]?.focus();
            break;
          }
          case "End": {
            e.preventDefault();
            const lastFocusableIndex = Math.min(this.value.length, inputs.length - 1);
            inputs[lastFocusableIndex]?.focus();
            break;
          }
          case "Backspace": {
            e.preventDefault();
            if (this.value[index]) {
              this.#deleteCharAtIndex(index);
            } else {
              this.#deleteCharAtIndex(index - 1);
              setTimeout(() => inputs[index - 1]?.focus());
            }
            break;
          }
        }
      },
      onpointerdown: (e) => {
        const el = e.target;
        if (!isHtmlInputElement(el)) {
          return;
        }
        setInputSelectionRange(el, 1, 1);
        if (this.value[index]) return;
        const inputs = this.#getInputEls();
        setTimeout(() => inputs[this.value.length]?.focus());
      },
      onpointerup: (e) => {
        const el = e.target;
        if (!isHtmlInputElement(el)) {
          return;
        }
        setInputSelectionRange(el, 1, 1);
      },
      oninput: (e) => {
        const el = e.target;
        if (!isHtmlInputElement(el)) {
          return;
        }
        e.preventDefault();
        const prev = currValue;
        const inputted = prev ? el.value.slice(prev.length) : el.value;
        if (inputted.length === 1) {
          const char = el.value.slice(el.value.length - 1);
          if (!validateInput(char, this.type)) {
            this.#props.onError?.({
              method: "input",
              message: `Input did not match the type ${this.type}`
            });
            el.value = el.value.slice(0, -1);
            return;
          }
          el.value = char;
          this.#addCharAtIndex(char, index);
          const inputs = this.#getInputEls();
          const currIndex = inputs.indexOf(el);
          setTimeout(() => inputs[currIndex + 1]?.focus());
        } else {
          if (this.#props.onPaste) {
            this.#props.onPaste(inputted);
          } else {
            onpaste(inputted);
          }
        }
      },
      onfocus: () => {
        this.#focusedIndex = index;
      },
      onblur: () => {
        this.#focusedIndex = -1;
      },
      onpaste: (e) => {
        e.preventDefault();
        const pasted = e.clipboardData?.getData("text");
        console.log(pasted);
        if (!pasted) return;
        if (this.#props.onPaste) {
          this.#props.onPaste(pasted);
        } else {
          onpaste(pasted);
        }
      }
    };
  }
}
createDataIds("popover", ["trigger", "content"]);
createDataIds("progress", ["root", "progress"]);
createBuilderMetadata("radio-group", ["root", "item", "label", "hidden-input"]);
createBuilderMetadata("select", ["trigger", "content", "option"]);
createDataIds("slider", ["root", "track", "thumb", "range"]);
createDataIds("tabs", ["trigger", "content", "trigger-list"]);
createBuilderMetadata("toaster", ["root"]);
createBuilderMetadata("toaster-toast", ["content", "title", "description", "close"]);
createDataIds("toggle", ["trigger", "hidden-input"]);
createBuilderMetadata("tooltip", ["trigger", "content", "arrow"]);
createDataIds("tree", ["root", "item", "group"]);
function _page($$payload, $$props) {
  push();
  userStore.subscribe((value) => {
  });
  let username = void 0;
  const pinInput = new PinInput({
    maxLength: 6,
    mask: true,
    type: "numeric",
    onValueChange: (value) => {
      if (pinInput.isFilled) document.querySelector('button[type="submit"]').focus();
    }
  });
  const each_array = ensure_array_like(pinInput.inputs);
  $$payload.out += `<div class="w-full grid grid-cols-1 place-items-center h-full px-64 gap-8"><div class="w-full flex place-content-center"><div class="flex place-content-center overflow-clip border-2 border-primary-800 w-[400px] h-[400px] rounded-[50%]"><img class="object-cover" src="/Dinosaur.svg" alt="Playful Children"></div></div> <form><div class="w-full grid grid-cols-1 gap-4 place-items-center"><input${attr("value", username)} class="input-primary-lg w-120 border-0 focus:border-2 focus:border-primary-800" type="text" placeholder="Username" required aria-required="true"> <div${spread_attributes(
    {
      class: "flex place-content-center font-mono gap-2 w-120",
      ...pinInput.root
    }
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let input = each_array[$$index];
    $$payload.out += `<input${spread_attributes(
      {
        class: "w-full h-16 size-12 rounded-3xl bg-white text-center border-0 focus:border-2 focus:border-primary-800 transition disabled:cursor-not-allowed",
        required: true,
        "aria-required": "true",
        ...input
      }
    )}>`;
  }
  $$payload.out += `<!--]--></div> <button type="submit" class="w-full text-size-2xl h-16 font-bold text-white mt-4 rounded-3xl bg-secondary-400 hover:scale-105 active:scale-100">Masuk</button></div></form></div>`;
  pop();
}
export {
  _page as default
};
