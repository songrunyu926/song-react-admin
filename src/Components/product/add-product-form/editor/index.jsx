import React,{Component} from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'

export default class Editor extends Component {
    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null)
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    render () {
        const { editorState } = this.state
        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    placeholder="请输入商品详情"
                    className="text-editor"
                />
            </div>
        )
    }
}
