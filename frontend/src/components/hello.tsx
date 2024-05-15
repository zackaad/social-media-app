import React, { Component, ReactNode } from "react";
import axiosInstance from "../actions/axiosApi";

interface HelloState {
    message: string;
}

class Hello extends Component<{}, HelloState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            message: "",
        };

        this.getMessage = this.getMessage.bind(this)
    }

    async getMessage(): Promise<string> {
        const access_token = localStorage.getItem("access_token");
        try {
            let response = await axiosInstance.get('http://localhost:8000/auth/hello/', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            const message = response.data.hello;
            this.setState({
                message: message,
            });
            return message;
        } catch (error) {
            console.log("Error: ", JSON.stringify(error, null, 4));
            throw error;
        }
    }

    async componentDidMount(): Promise<void> {
        // It's not the most straightforward thing to run an async method in componentDidMount

        // Version 1 - no async: Console.log will output something undefined.
        const messageData1 = await this.getMessage();
        console.log("messageData1: ", JSON.stringify(messageData1, null, 4));
    }


    render(): ReactNode {
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        )
    }
}

export default Hello;