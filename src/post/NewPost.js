import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 1MB",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    newPostForm = (title, body) => (
        <>
            <div className="field">
                <label className="label">Post Photo</label>
                <div class="file">
                        <label class="file-label">
                            <input className="file-input" type="file" name="resume" 
                            onChange={this.handleChange("photo")}
                            accept="image/*"
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                     Choose a file…
                                </span>
                            </span>
                            
                        </label>
                </div>
            </div>
            <div className="field">
                <label className="label">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="input is-rounded"
                    value={title}
                />
            </div>

            <div className="field">
                <label className="label">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="textarea is-info"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="button is-rounded is-focused is-black"
            >
                Create Post
            </button>
        </>
    );

    render() {
        const {
            title,
            body,
            photo,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className="container box box-shadow mt-6">
                <h2 className="title">Create a new post</h2>
                    <div className="notification is-danger"
                        style={{ display: error ? "" : "none" }}
                        >
                        {error}
                    </div>

                        {loading ?(
                            <progress class="progress is-small is-dark" max="100">15%</progress>
                            ):("")}

                    {this.newPostForm(title, body)}
            </div>
        );
    }
}

export default NewPost;