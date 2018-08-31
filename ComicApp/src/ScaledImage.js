import React, { Component } from 'react';
import {
    Text,
    View,
    Image, Dimensions
} from 'react-native';

class ScaledImage extends Component {
    state = {
        height: 0
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log('Will Mount')
        Image.getSize(this.props.uri, (realWidth, realHeight) => {
            this.setState({
                height: realHeight * this.props.width / realWidth
            })
        })
    }

    render() {
        return (
            <Image
                source={{ uri: this.props.uri }}
                style={{ height: this.state.height, width: this.props.width }}
            />
        );
    }
}

export default ScaledImage; 