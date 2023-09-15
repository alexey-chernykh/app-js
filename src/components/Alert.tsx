interface IProps{
    children: string;
}

function Alert(props: IProps) {
    const {children} = props;

  return (
    <div className="alert alert-danger" role="alert">
        {children}
    </div>
  )
}

export default Alert