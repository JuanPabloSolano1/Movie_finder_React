import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

// create components - Slice the text > something
class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      movie: "",
      rating: "",
      image: "",
      synopsys: "",
      visibility: "hidden",
      releaseDate: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
    if (event.target.value === "") {
      this.setState({
        movie: "",
        rating: "",
        image: "",
        synopsys: "",
        visibility: "hidden",
        releaseDate: ""
      });
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e1947c7120a48059d738fb40d95b3fd0&language=en-US&query=${
          this.state.query
        }&page=1&include_adult=false`
      )
        .then(response => response.json())
        .then(data => {
          if (data.results === undefined) {
            this.setState({
              movie: "",
              rating: "",
              image: ""
            });
          } else {
            this.setState({
              movie: data.results[0].title,
              rating: data.results[0].vote_average * 10,
              image: data.results[0].poster_path,
              synopsys: data.results[0].overview,
              visibility: "visible",
              releaseDate:
                "Release Date: " +
                new Date(data.results[0].release_date)
                  .toString()
                  .slice(4, 15)
                  .replace(/\s+/g, "-")
            });
          }
        });
    }
  }

  render() {
    return (
      <div>
        <div className="banner">
          <form className="form" onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} />
            <ImageSearchIcon />
          </form>
        </div>
        <div className="container">
          <h1 id="title">{this.state.movie}</h1>
          <div className="image_text">
            <img
              id="movie_image"
              alt=""
              src={`https://image.tmdb.org/t/p/w300//${this.state.image}`}
            />
            <p id="synopsys">{this.state.synopsys}</p>
            <div
              className="progress"
              style={{
                width: "140px",
                height: "160px",
                backgroundColor: "white",
                visibility: this.state.visibility
              }}
            >
              <CircularProgressbar
                strokeWidth={10}
                value={this.state.rating}
                text={`${this.state.rating}%`}
                styles={{
                  backgroundColor: "green"
                }}
              />
            </div>
            <p id="release_date">{this.state.releaseDate}</p>
          </div>
        </div>
      </div>
    );
  }
}

render(<Movies />, document.getElementById("root"));
