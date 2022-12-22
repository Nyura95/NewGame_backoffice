import React from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button, Form, Input, TypeAlert } from '@cityscoot/components'
import { Row, Col, Card } from '@cityscoot/components'

import { useGetAccountMutation } from '../../app/services/api/account'
import { useLoginMutation } from '../../app/services/api/auth'
import { AppDispatch } from '../../app/store'
import Logo from '../../assets/img/bg-pricing.jpg'
import Layout from '../../containers/login'
import { AUTH_SUCCESS } from '../../i18n/const'
import { setAccount } from '../account/accountSlice'
import { add } from '../notify/notifySlice'
import { Footer } from './Footer'

export const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [getAccount, { isLoading: isLoadingAccount }] = useGetAccountMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

  return (
    <Layout bg={Logo} footer={<Footer />} text={'NewGame'}>
      <Row>
        <Col lg={4} md={8} col={12} className="mx-auto">
          <Card className="z-index-0 fadeIn3 fadeInBottom" isBusy={isLoading || isLoadingAccount}>
            <Card.Header className="p-0 position-relative mt-n4 mx-3 z-index-2">
              <Card.Header.Bg>
                <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                  {t('pages.login.connect')}
                </h4>
              </Card.Header.Bg>
            </Card.Header>
            <Card.Body>
              <Form
                form={{ email: '', password: '' }}
                className="text-start"
                onSubmit={async form => {
                  await login({ email: form.email, password: form.password }).unwrap()
                  const account = await getAccount({}).unwrap()
                  dispatch(setAccount(account.Data))
                  dispatch(add({ i18n: AUTH_SUCCESS, type: TypeAlert.success }))
                  navigate('/')
                }}>
                <Input label="Email" type="email" name="email" className="my-3" required />
                <Input
                  label="Mot de passe"
                  type="password"
                  name="password"
                  className="mb-3"
                  required
                />
                <Form.ButtonRow>
                  <Button type="submit" className="w-100 my-4 mb-2">
                    Valider
                  </Button>
                </Form.ButtonRow>
                <p className="mt-4 text-sm text-center">
                  <a className="cursor-pointer">Créer un compte ?</a>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default Login
