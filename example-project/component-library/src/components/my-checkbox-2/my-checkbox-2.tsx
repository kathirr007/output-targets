import { Component, h, Prop, Event, EventEmitter, Host } from '@stencil/core';
import { generateRandomId } from '../../utils/generateRandomId';

export type LabelPositionType = 'left' | 'right';

@Component({
  tag: 'my-checkbox-2',
  styleUrl: './my-checkbox-2.scss',
  shadow: true,
})
export class MyCheckbox2 {
  /**
   * The checkbox label
   */
  @Prop() label!: string;
  /**
   * Condition if the checkbox is disabled or not
   */
  @Prop({ reflect: true }) disabled: boolean = false;
  /**
   * Condition if the checkbox is required or not
   */
  @Prop({ reflect: true }) required: boolean = false;
  /**
   * Condition if the checkbox is read-only or not
   */
  @Prop({ reflect: true }) readonly: boolean = false;
  /**
   * Condition if the checkbox is indeterminate or not
   */
  @Prop({ reflect: true }) indeterminate: boolean = false;
  /**
   * (optional) hide label for checkbox
   */
  @Prop({ reflect: true }) hideLabel: boolean = false;
  /**
   * Flag to conditionally checked by default
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  /**
   * Hint text to be displayed beneath the checkbox label to provide additional guidance to the user
   */
  @Prop() hint: string;
  /**
   * Name of an icon to be displayed before the label
   */
  @Prop() iconName: string;
  /**
   * URL from which the icon needs to be loaded
   */
  @Prop() iconPath: string;
  /**
   * Id of the underlying `<input>`. A random id is generated when not specified
   */
  @Prop() inputId: string = generateRandomId();
  /**
   * Provide a name for the underlying `<input>` node
   */
  @Prop({ reflect: true }) name: string;
  /**
   * Provide a value for the underlying `<input>` node. This is the value provided in the event.detail of mycheckboxchange
   */
  @Prop() value: string;
  /**
   * Set position of the label
   */
  @Prop({ reflect: true }) labelPosition: LabelPositionType = 'right';
  /**
   * Event triggered when the user changes the checkbox value
   */
  @Event() mycheckboxchange: EventEmitter<{ checked: boolean; value: string }>;

  private handleChange = (event: any) => {
    this.checked = event.target.checked;
    this.mycheckboxchange.emit({
      checked: this.checked,
      value: event.target.value,
    });
  };

  private shouldRenderIcon = () => Boolean(this.iconName) || Boolean(this.iconPath);

  private handleMouseDown = (event: MouseEvent) => {
    // Prevent default mouse down behaviour to avoid focus shifting to <body> when rapidly clicking the checkbox component.
    // This ensures consistent focus handling.
    event.preventDefault();
  };

  private renderLabelAndHintText = () =>
    !this.hideLabel && (
      <div class="my-checkbox-description">
        <div class="my-checkbox-description-label-container">
          <div id={`${this.inputId}-label`} class="my-checkbox-description-label">
            {this.label}
          </div>
        </div>
        <div class={this.shouldRenderIcon() ? 'my-checkbox-description-hint' : undefined}>
          {this.hint}
        </div>
      </div>
    );

  render() {
    return (
      <Host>
        <label htmlFor={this.inputId} class="my-checkbox" onMouseDown={this.handleMouseDown}>
          <input
            type="checkbox"
            id={this.inputId}
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled || this.readonly}
            required={this.required}
            onChange={this.handleChange}
            aria-describedby={this.hint && !this.hideLabel ? `${this.inputId}-hint` : ''}
            aria-label={this.label}
          />
          <div class="my-checkbox-button" />
          {this.renderLabelAndHintText()}
        </label>
      </Host>
    );
  }
}
