import {NextApiRequest, NextApiResponse} from 'next'

interface GithubBody {
    client_id: string,
    client_secret: string,
    code: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code as string
    const body: GithubBody = {
        client_id: '4d39a3c2879f21dc07d5',
        client_secret: 'bc308ddc14a44a5048eb27e12006c639df489f51',
        code
    }
    console.log(code)
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    })
    console.log(response)
    const json = await response.json()
    console.log(json)
    const url = process.env.NODE_ENV === "production" ? 'https://social-todos-web.vercel.app' : "http://localhost:3000"
    res.redirect(url + '/auth?code=' + json.access_token)
}
