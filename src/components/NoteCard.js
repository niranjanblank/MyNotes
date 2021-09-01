import { Card, IconButton, makeStyles, Typography } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { DeleteOutlined, MoreVert } from "@material-ui/icons";

const useStyles = makeStyles({
    test:{
        border: (note) => {
            if(note.category=='work'){
                return '1px solid red'
            }
        }
    }
})

const NoteCard = (props) => {
    const classes = useStyles(props.note)
    return (
        <div >
            <Card elevation={1}  > 
                <CardHeader action={
                    <IconButton onClick={()=> props.handleDelete(props.note._id)}>
                       <DeleteOutlined/>
                    </IconButton>
                }
                title={props.note.title}
                subheader={props.note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {props.note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>

      );
}
 
export default NoteCard;