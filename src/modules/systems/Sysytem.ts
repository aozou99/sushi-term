export class System {
  constructor(readonly output: object[]) {}

  public out(text: string): void {
    this.output.push({ content: text });
  }

  public error(text: string): void {
    this.output.push({ content: this.css(text, { color: "red" }) });
  }

  private css(text: string, style: { [key: string]: string }): string {
    const stack = [];
    for (const key of Object.keys(style)) {
      stack.push(`${key}:${style[key]};`);
    }
    return `<span style="${stack.join()}">${text}</span>`;
  }
}
