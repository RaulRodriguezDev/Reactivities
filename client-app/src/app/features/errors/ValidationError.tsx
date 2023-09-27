import { Message } from "semantic-ui-react"

interface Props {
    errors: string[]
}
const ValidationError = ({errors}: Props) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error: string, i) => (
                        <Message.Item key={i}>{error}</Message.Item> 
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationError
