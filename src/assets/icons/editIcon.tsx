import { IconProps } from "../../types"

const EditIcon = ({
        color = 'black',
        stroke = 1.25,
        size = 16,
    }: IconProps) => {
    return (
        <svg width={`${size}`} height={`${size}`} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.68076 3.88562L10.5664 2L13.8662 5.29983L11.9806 7.18545M8.68076 3.88562L2.37399 10.1924C2.18646 10.3799 2.0811 10.6343 2.0811 10.8995V13.7851H4.96672C5.23193 13.7851 5.48629 13.6798 5.67382 13.4922L11.9806 7.18545M8.68076 3.88562L11.9806 7.18545" stroke={color} stroke-width={`${stroke}`} stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

export default EditIcon