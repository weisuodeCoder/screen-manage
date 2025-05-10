import peopleIcon from '../../assets/icon/people.svg'
import './style.less'

interface SmallContentProps {
    iconData: {
        icon: string;
        title: string;
        subTitle: string;
    };
    number: string;
}

export default function SmallContent(props: SmallContentProps) {
    const { iconData = { icon: peopleIcon, title: '默认标题', subTitle: '默认副标题' }, number = "1024" } = props;
    return (
        <div className='content-box'>
            <div className='content-left'>
                <img src={iconData.icon} />
                <div>{iconData.title}</div>
                <div>{iconData.subTitle}</div>
            </div>
            <div className='conten-right'>{number}</div>
        </div>
    )
}
