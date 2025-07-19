/* eslint-disable react/prop-types */
// import { use } from 'react'
import { useState } from "react";
import { useField } from "./hooks";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button, Form, Nav, Navbar, Table } from "react-bootstrap";
import { Notification } from "./components/Components";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationsReducer";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              anecdotes
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/create" style={padding}>
              create new
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/about" style={padding}>
              about
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>{anecdote.author}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <ul></ul>
  </div>
);

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id === Number(id));
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

// const Notification = ({ notification }) => {
//   if (notification === "") {
//     return null;
//   }
//   return (
//     <Alert variant="success" style={{ marginTop: "10px" }}>
//       {notification}
//     </Alert>
//   );
// };

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control name="content" {...content} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control name="author" {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url for more info</Form.Label>
          <Form.Control name="info" {...info} />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">
            create
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              resetContent();
              resetAuthor();
              resetInfo();
            }}
          >
            reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    dispatch(setNotification(`a new anecdote ${anecdote.content} created!`, 5));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <Router>
      <div className="container">
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification />
        <Routes>
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
