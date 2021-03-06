import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import SocialLogin from '../src'

const handleSocialLogin = (user) => {
  console.log(user)
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

class Button extends Component {
  static propTypes = {
    triggerLogin: PropTypes.func.isRequired
  }

  render () {
    const style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    }

    return (
      <div onClick={this.props.triggerLogin} style={style}>
        { this.props.children }
      </div>
    )
  }
}

const SocialButton = SocialLogin(Button)

class GitHubLogin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      githubToken: ''
    }

    this.trackChange = this.trackChange.bind(this)
  }

  trackChange (e) {
    this.setState({
      githubToken: e.target.value
    })
  }

  render () {
    return (
      <div style={{ marginTop: '1rem' }}>
        <h3>GitHub Authentication with personal token</h3>
        <label htmlFor='gh_token' style={{ display: 'block' }}>GitHub Personal Token</label>
        <input
          id='gh_token'
          type='text'
          onChange={this.trackChange}
          value={this.state.githubToken}
          style={{ display: 'block', marginBottom: '1rem', minWidth: '50%' }}
        />
        {
          this.state.githubToken
            ? <SocialButton
              provider='github'
              appId={this.state.githubToken}
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            >
              Login with GitHub
            </SocialButton>
            : null
        }
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <div>
      <SocialButton
        provider='amazon'
        appId='amzn1.application-oa2-client.26aaf63624854cbcaa084735a0fc47ed'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Amazon
      </SocialButton>
      <SocialButton
        provider='facebook'
        appId='309479849514684'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Facebook
      </SocialButton>
      <SocialButton
        autoCleanUri
        provider='github'
        mode='server'
        fetchAccessToken='http://localhost:3000/github-oauth'
        appId='8a7c2edb2e602d969839'
        redirect='https://localhost:8080'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with GitHub OAuth
      </SocialButton>
      <SocialButton
        provider='google'
        appId='844845104372-h8htjngp1os1tb79nksc54dq7tko4r8n.apps.googleusercontent.com'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Google
      </SocialButton>
      <SocialButton
        autoCleanUri
        provider='instagram'
        appId='afdf675d26214280ac9a792afea5651c'
        redirect='https://localhost:8080'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Instagram
      </SocialButton>
      <SocialButton
        provider='linkedin'
        appId='7775kne2guetd0'
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with LinkedIn
      </SocialButton>
    </div>
    <GitHubLogin />
  </div>,
  document.getElementById('app')
)
