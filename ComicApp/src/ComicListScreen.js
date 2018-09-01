import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList
} from 'react-native';
import Orientation from 'react-native-orientation'

import axios from 'axios'
// import { data } from './database.json'
import ComicListItem from './ComicListItem';
import ModalSelector from 'react-native-modal-selector'

class ComicListScreen extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get('https://api.techkids.vn/reactnative/api/comics')
            .then(res => this.setState({ data: res.data.comics }))
    }

    loadComicByCategory = (category) => {
        axios.get(`https://api.techkids.vn/reactnative/api/comics?category=${category}`)
            .then(res => this.setState({data: res.data.comics.comics}))
    }

    renderItem = ({ item }) => <ComicListItem comic={item}
        navigation={this.props.navigation} />

    keyExtractor = (item) => item._id

    render() {
        Orientation.lockToPortrait()

        const categories = [
            {key: 0, label: 'Tất cả'},
            {key: 1, label: 'Con người - Tâm lý học - Hành vi'},
            {key: 2, label: 'Kinh tế - Chính trị'},
            {key: 3, label: 'Sức khoẻ'},
            {key: 4, label: 'Văn hoá - Lịch sử - Xã hội'}
        ]

        return (
            <View>
                <ModalSelector 
                    data={categories}
                    initValue='Tất cả'
                    onChange={(option) => this.loadComicByCategory(option.label)}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    numColumns='2'
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

export default ComicListScreen;