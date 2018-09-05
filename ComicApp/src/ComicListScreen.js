import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Orientation from 'react-native-orientation'

import axios from 'axios'
// import { data } from './database.json'
import ComicListItem from './ComicListItem';
import ModalSelector from 'react-native-modal-selector'

class ComicListScreen extends Component {
    state = {
        data: [],
        loading: true
    }

    componentDidMount() {
        axios.get('https://api.techkids.vn/reactnative/api/comics')
            .then(res => this.setState({ data: res.data.comics, loading: false }))
    }

    loadComicByCategory = (category) => {
        this.setState({ loading: true })
        category === 'Tất cả'
            ? axios.get(`https://api.techkids.vn/reactnative/api/comics`)
                .then(res => this.setState({ data: res.data.comics, loading: false }))
            : axios.get(`https://api.techkids.vn/reactnative/api/comics?category=${category}`)
                .then(res => this.setState({ data: res.data.comics.comics, loading: false }))
    }

    renderItem = ({ item }) => <ComicListItem comic={item}
        navigation={this.props.navigation} />

    keyExtractor = (item) => item._id

    render() {
        Orientation.lockToPortrait()

        const categories = [
            { key: 0, label: 'Tất cả' },
            { key: 1, label: 'Con người - Tâm lý học - Hành vi' },
            { key: 2, label: 'Kinh tế - Chính trị' },
            { key: 3, label: 'Sức khoẻ' },
            { key: 4, label: 'Văn hoá - Lịch sử - Xã hội' }
        ]

        return (
            <View>
                <ModalSelector
                    data={categories}
                    initValue='Tất cả'
                    onChange={(option) => this.loadComicByCategory(option.label)}
                />
                <View>
                    {this.state.loading === false ? (
                        <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        numColumns='2'
                        keyExtractor={this.keyExtractor}
                    />
                    ) : (
                        <ActivityIndicator/>
                    )}
                </View>
                
            </View>
        );
    }
}

export default ComicListScreen;