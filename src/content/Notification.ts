import Prism from "prismjs";
import Emojis from "./Emojis";
import ShadowDOMComponent from "./ShadowDOMComponent";

/**
 * {@link displayMessage} about the current clicked element, see {@link registerEvents} cb, {@param getTargetCallback}.
 *
 * @class Notification
 * @extends ShadowDOMComponent
 */
class Notification extends ShadowDOMComponent {

  constructor(shadowRoot: ShadowRoot) {
    super(shadowRoot);
    this.bindMethods();
  }

  protected bindMethods(): void {
    this.copySelector = this.copySelector.bind(this);
  }

  private copySelector(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const selector = target.dataset.selector;
    if (selector) {
      navigator.clipboard.writeText(selector).then(() => {
        console.log('selector copied:', selector);
      }).catch(err => {
        console.error('could not copy: ', err);
      });
    } else {
      console.error('no selector found');
    }
  }

  registerEvents(getTargetCallback: () => HTMLElement): void {
    document.addEventListener("click", this.copySelector);
  }
}

export default Notification;
