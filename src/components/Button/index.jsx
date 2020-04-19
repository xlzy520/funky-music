import React from 'react';
import classNames from "../../lib/classnames";

const defaultProps = {
  type: 'default',
  shape: '',
  nativeType: 'button',
  loading: false,
  disabled: false,
  plain: false
};

const Button = (props = defaultProps) => {
  const onClick = (e) => {
    if (!props.loading) {
      props.onClick && props.onClick(e);
    }
  }
  
  return (
    <button type="button" onClick={onClick}
            className={classNames('funky-btn', {
              'funky-btn-circle': props.shape === 'circle',
              'funky-btn-icon-only': props.icon && !props.children,
              'funky-btn-primary': props.type === 'primary',
              'funky-btn-background-ghost': props.ghost
            })}>
      {props.icon}
      <span>{props.children}</span>
    </button>
    // <button
    //   className={classNames('el-button',props.type && `el-button--${props.type}`,
    //     props.size && `el-button--${props.size}`,
    //     {
    //     'is-disabled':props.disabled,
    //     'is-loading':props.loading,
    //     'is-plain':props.plain
    //   })}
    //   disabled={props.disabled} type={props.nativeType} onClick={onClick}>
    //   {props.loading && <i className="el-icon-loading"/>}
    //   {props.icon && !props.loading && <i className={`el-icon-${props.icon}`}/>}
    //   <span>{props.children}</span>
    // </button>
  )
}

export default Button
