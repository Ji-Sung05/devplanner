import React from 'react'
import Home from './Home'

const Manual = () => {
  return (
    <Home>
      <div id='manual'>
        <div className='manual__inner'>
          <h2 className='manual__title'>OAuth 앱 권한 부여</h2>
          <p className='manual__desc'>
            GitHub OAuth 로그인을 통해 organization에 접근하려면, GitHub OAuth 애플리케이션
            정책에서 `Remove Restrictions` 설정을 해야 하는 경우가 있습니다. <br />이 설정은 GitHub에서
            애플리케이션이 조직의 리소스에 액세스 할 수 있도록 허용하는 데 필요한 정책입니다.
          </p>
          <div>
            <video src="/images/dev.mp4" width={640} controls></video>
          </div>
          <p className='manual__title'>사용법</p>
          <p className='manual__desc'>
            1. 먼저 깃허브 페이지에서 새 조직을 생성하고 `Remove Restrictions`을 설정합니다. <br />
            2. 애플리케이션으로 들어와서 Organization 탭으로 이동하면 생성한 조직이 나타납니다. <br />
            3. 해당 조직에 들어간 후 레포지토리를 생성합니다. <br />
            4. 레포지토리를 생성하고 나면 해당 레포지토리에서 수행할 작업들을 작성해서 관리할 수 있습니다.
          </p>
          <p className='manual__title'>Remove Restrictions 설정 방법</p>
          <img src="/images/github1.png" alt="깃허브" />
          <ol>
            <li>1. 생성한 조직의 페이지로 이동하여 `Setting`(설정) 탭으로 이동합니다.</li>
            <li>2. 설정 페이지에서 `Third-party access` 또는 `OAuth applications` 섹션을 찾습니다.</li>
            <li>3. 조직에서 제한된 애플리케이션의 목록을 볼 수 있습니다. <br /> 여기에서 여러분의 애플리케이션을 찾아서 제한을 해제(Remove Restrictions)할 수 있습니다.</li>
            <li>4. `Remove Restrictions`클릭</li>
          </ol>
          <img src="/images/github2.png" alt="깃허브" />
          <p className='manual__desc'>이는 OAuth 애플리케이션이 조직의 리포지토리, 프로젝트, 팀 등에 접근할 수 있도록 허용합니다. <br />
            이를 통해 애플리케이션에서 조직의 데이터를 활용할 수 있으며, 자동화 작업이나 특정 기능을 구현할 수 있습니다.
          </p>
          <h2 className='manual__title'>주의사항</h2>
          <p className='manual__desc'>
            조직 리소스에 대한 접근 권한을 부여함으로써 애플리케이션이 악의적으로 사용되거나, 해킹당할 경우
            조직의 데이터가 노출될 위험이 있습니다. <br /> 특히 권한이 잘못 부여되면 민감한 정보가 외부에 유출될 수 있습니다.
          </p>
          <p className='manual__desc'>Remove Restrictions 설정은 GitHub 조직에서 애플리케이션의 기능을 확장하고 
            팀의 생산성을 높일 수 있는 유용한 도구입니다. <br />
            그러나 이를 활성화할 경우 보안과 권한 관리 측면에서 주의가 필요합니다. <br />
            따라서 설정을 진행하기 전에 신중한 검토가 필요하며, 필요하지 않은 경우에는 
            최소 권한 원칙을 준수하는 것이 중요합니다.
          </p>
        </div>
      </div>
    </Home>
  )
}

export default Manual