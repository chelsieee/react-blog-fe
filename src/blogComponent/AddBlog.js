import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Editor } from '@tinymce/tinymce-react';


const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  form: {
    maxWidth: "80%",
    minHeight: "20vh",
    display: "flex",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const AddBlog = (props) => {
  const classes = useStyles();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    categoryId: props.categories[0].id
  });

  const handleChange = (e) => {
    const newBlog = { ...blog };
    newBlog[e.target.name] = e.target.value;
    console.log('newBlog', newBlog)
    setBlog(newBlog)
    console.log('handlechange', blog)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New blog:", blog);
    const newBlog ={...blog}
    console.log("New blog:", newBlog);
    props.submit(newBlog);
  };

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    blog.content =content
    console.log("andleEditorChangeBlog", blog)
  }


  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      container
      className={classes.root}
      spacing={0}
      alignItems="center"
      justify="center"
    >
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <Card className={classes.card}>
          <CardContent>
            <div>
              <TextField
                id="standard-full-width"
                label="Title"
                placeholder="type your blog title"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={blog.title}
                onChange={handleChange}
                name="title"
              />
              <Editor
        apiKey="2v6fp0mod1nvpcwwx9i2jl4ow8175gap9xvcehxhgjuw1a44"
         init={{
          selector: 'textarea',
          placeholder: "Type content here...",
          height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={handleEditorChange}
         
       />
             </div>
          </CardContent>
          <CardContent>
            <FormControl className={classes.formControl}>
              <InputLabel shrink id="category">
                Category
              </InputLabel>
              <Select
                name="categoryId"
                id="categories"
                labelId="demo-simple-select-placeholder-label-label"
                value={blog.categoryId}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
              >
                {props.categories.map((el, index) => (
                  <MenuItem key={index} value={el.id}>
                    {el.tag}{" "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </Grid>
  );
};
