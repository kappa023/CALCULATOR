import "./Calculator.scss"

export default function Title (props:{
    title:string;
}){
    return (
    <div>
         <h1 className="title">{props.title}</h1>
    </div>)
}