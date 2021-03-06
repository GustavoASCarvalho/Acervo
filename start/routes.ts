import Route from '@ioc:Adonis/Core/Route'
import Image from 'App/Models/Image'
import Post from 'App/Models/Post'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'


Route.get('/', async ({ view }) => {
  const images = await Image.query().limit(4).orderBy('created_at', 'desc')
  const posts = await Post.query().orderBy('created_at', 'desc').where('is_deleted', false)
  posts.forEach(post => {
    post['data'] = format(Number(post.createdAt), "dd 'de' MMMM', às ' HH:mm'h'", { locale: ptBR })
  })

  return view.render('home', { images, posts })
})

Route.group(() => {
  Route.get('/users', 'AuthController.list').as('auth.list')
  Route.get('/users/:id/edit', 'AuthController.edit').as('auth.edit')
  Route.post('/users/:id/edit', 'AuthController.update').as('auth.update')


  Route.get('/posts', 'PostsController.list').as('post.list')
  Route.get('/posts/:id/edit', 'PostsController.edit').as('post.edit')
  Route.post('/posts/:id/edit', 'PostsController.update').as('post.update')
  Route.get('/post/create', 'PostsController.create').as('post.create')
  Route.post('/post/create', 'PostsController.store').as('post.store')
  Route.get('/post/:id/delete', 'PostsController.delete').as('post.delete')

  Route.get('/image/create', 'ImagesController.create').as('image.create')
  Route.post('/image/create', 'ImagesController.store').as('image.store')
  Route.post('/image/:id/update', 'ImagesController.update').as('image.update')
  Route.get('/image/:id/edit', 'ImagesController.edit').as('image.edit')
  Route.get('/image/:id/delete', 'ImagesController.delete').as('image.delete')

  Route.get('/logs', 'LogsController.index').as('log.index')

  Route.get('/tags/create', 'TagsController.create').as('tags.create')
  Route.post('/tags/create', 'TagsController.store').as('tags.store')


}).middleware('auth')

Route.get('/user/:id', 'AuthController.show').as('auth.show')

Route.get('/images', 'ImagesController.index').as('image.index')
Route.post('/images', 'ImagesController.search').as('image.search')
Route.get('/image/:id/show', 'ImagesController.show').as('image.show')
Route.get('/post/:id/show', 'PostsController.show').as('post.show')

Route.get('/register', 'AuthController.register').as('auth.register')
Route.get('/login', 'AuthController.login').as('auth.login')
Route.post('/register', 'AuthController.store').as('auth.store')
Route.post('/login', 'AuthController.verify').as('auth.verify')
Route.get('/logout', 'AuthController.logout').as('auth.logout')

