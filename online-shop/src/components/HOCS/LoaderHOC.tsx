import React, {Component, Props} from 'react';
export interface LoadingProps{
    isLoading:boolean;
}

export const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & LoadingProps> {
    render() {
        console.log(this.props.isLoading);
      return  this.props.isLoading ? <div className="pageloader is-active"><span className="title">Loading</span></div>: <Component {...this.props as P} />;
    }
  };
