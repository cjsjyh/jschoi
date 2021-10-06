import axios from 'axios'
import dayjs from 'dayjs'
import markdownBinder from '@web/util/markdownBinder'
import { API_URL } from '@web/config'

import { ComponentProps } from '@web/types'

import BaseComponent from '@web/components/shared/BaseComponent'
import PostList from './PostList'

import './post.scss'

interface PostProps {
  postId: number
}

export interface PostDetail {
  id: number
  title: string
  content: string
  createdAt: string
  views: number
  isExposed: boolean
}

type Props = PostProps & ComponentProps

const ROOT_ID = 'post-body'
const MARKDOWN_ID = 'markdown-content'

export default class Post extends BaseComponent {
  postDetail: PostDetail

  constructor(props: Props) {
    super(props)

    this.loadAndBindMarkdownPost(props.params.postId)
  }

  async loadAndBindMarkdownPost(postId: string) {
    const { data } = await axios.get<PostDetail>(`${API_URL}/api/blog/post/${postId}`)
    this.postDetail = data
    this.render(this.getJSXstr(), ROOT_ID)
    if (!this.isReturnStr) {
      markdownBinder(this.$element, MARKDOWN_ID, data.content)
    }
  }

  getJSXstr() {
    const postList = new PostList({ isReturnStr: true })
    return `
      <div id=${ROOT_ID}>
        <p class="title">${this.postDetail.title}</p>
        <div class="subtitle">
          <p>Junsoo Choi</p>
          <p>${dayjs(this.postDetail.createdAt).format('YYYY년 MM월 DD일')}</p>
        </div>
        <div class="content">
          <span id=${MARKDOWN_ID}></div>
        </div>
        ${postList.JSXstr}
      </div>
    `
  }
}
