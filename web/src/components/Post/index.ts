import dayjs from 'dayjs'
import markdownBinder from '@web/util/markdownBinder'
import { ComponentProps } from '@web/types'

import BaseComponent from '@web/components/shared/BaseComponent'
import PostList from './PostList'

import './post.scss'

const data = {
  title: 'this is my title',
  content: 'this is my content',
  createdAt: new Date(),
}

const ROOT_ID = 'post-body'
const MARKDOWN_ID = 'markdown-content'

const dummyMd = `
4줄요약:

1.  WebRTC는 peer-to-peer communication을 하기 위해 signaling이라는 process를 거쳐야한다.
2.  Peer-to-Peer 연결을 하기 위해 ICE Framework를 사용하며 UDP > TCP > STUN > TURN(relay)순으로 시도한다.
3.  연결이 되었으면 offer-and-answer mechanism으로 서로의 media capability를 교환한다. 자신의 RTCPeerConnection 인스턴스에 상대방의 자신과 상대방의 정보를 저장한다.
4.  RTCPeerConnection의 등록된 정보로 서로 연결하고 communication이 이루어진다.

**Signaling**: process of coordination communication. In order for a WebRTC app to set up a call, its client need to exchange the following information:

-   Metadata (codec, bandwidth, etc)
-   Network data (IP addr, port, etc)
-   etc

To avoid redundancy and to maximize compatibility with established technologies, signaling methods and protocols are not specified by WebRTC standards. You can use socket to build signaling services.

**RTCPeerConnection**: API used by WebRTC apps to create connection between peers and communicate audio and video. RTCPeerConnection has two tasks:

-   Obtain local media conditions (resolutions, codec capabilities) using offer-and-answer mechanism.
-   Obtain potential network address for the app's host, known as candidates.

Offer-and-answer mechanism (A is calling B):

Very similar to handshake procedure

**ICE framework**: framework used to find network interfaces and ports (candidates)

In reality most devices live behind one or more layers of NAT, some have antivirus SW that blocks certain ports and protocols. You can use ICE framework to overcome complexities. To enable this to happen, your app must pass ICE server URLs to RTCPeerConnection. ICE tries to find the best path to connect peers.

ICE tries to find the best path to connect peers. It tries all possibilities in parallel and chooses the most efficient option that works.

1.  ICE first tries to make a connection using the host address obtained from a device's OS and network card.(UDP > TCP)
    Every TURN server supports STUN. A TURN server is a STUN server with additional built-in relaying functionality.

**STUN**: NATs provides an IP address for use within a private local network to a device but this can't be used externally. You need a public address. WebRTC uses STUN get around this problem. STUN server live on the public internet and check the IP:port address of an incoming request (from an app running behind a NAT) and send that address back as a response. In other words, the app uses a STUN server to discover its IP:port from a public perspective.

**TURN**: RTCPeerConnection tries to set up direct communication using UDP. if that fails, it tries TCP. if that fails, TURN servers are used to relay data. TURN is used to relay audio, video, and data streaming between peers, not signlaing data. TURN servers have public addresses, so they can be contacted by peers even if the peers are behind firewalls or proxies.

Reference:  
[www.html5rocks.com/en/tutorials/webrtc/basics/](https://www.html5rocks.com/en/tutorials/webrtc/basics/)  
[www.html5rocks.com/en/tutorials/webrtc/infrastructure/](https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/)  
[www.html5rocks.com/en/tutorials/webrtc/datachannels/](https://www.html5rocks.com/en/tutorials/webrtc/datachannels/)

`

export default class Post extends BaseComponent {
  constructor(props: ComponentProps) {
    super(props)

    console.log(props)

    this.render(this.getJSXstr(), ROOT_ID)
    if (!this.isReturnStr) {
      markdownBinder(this.$element, MARKDOWN_ID, dummyMd)
    }
  }

  getJSXstr() {
    const postList = new PostList({ isReturnStr: true })
    return `
      <div id=${ROOT_ID}>
        <p class="title">${data.title}</p>
        <div class="subtitle">
          <p>Junsoo Choi</p>
          <p>${dayjs(data.createdAt).format('YYYY년 MM월 DD일')}</p>
        </div>
        <div class="content">
          <span id=${MARKDOWN_ID}></div>
        </div>
        ${postList.JSXstr}
      </div>
    `
  }
}
