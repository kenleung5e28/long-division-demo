declare global {
  interface Window {
    renderMathInElement(element: HTMLElement, options: {
      delimiters: Array<{ left: string, right: string, display: boolean }>
    }): void;
  }
}

export default function processMath (html: string): string {
  let el = new DOMParser().parseFromString(html, 'text/html');
  window.renderMathInElement(el.documentElement, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false }
    ]
  });
  return el.getElementsByTagName('body')[0].innerHTML;
}