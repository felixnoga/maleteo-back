const debug = require('debug')('Maleteo-Back-APICRUD:isAuthenticated')

const Conversation = require('../models/Conversation')
const Message = require('../models/Message')

//endpoint get /CHAT
//Ver todas las conversaciones de un usuario y mostrar ultimo mensaje de la conversacion
const getConversations = function(req, res, next) {
  debug('Obteniendo listado de todas las conversaciones/rooms del usuario')
  //Devolver solo un mensaje de cada caonversacion  (limit1) para enseñar
  //como snipet al lado de la conversacion
  Conversation.find({ participants: req.UserId })
    .select('_id')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      // Inicializar un array vacio, para las conversaciones y el mensaje mas reciente
      if (conversations.length === 0) {
        return res.status(200).json({ message: 'No conversations yet' })
      }
      const fullConversations = []
      conversations.forEach(function(conversation) {
        debug('Buscando mensajes en conversacion ', conversation._id)
        Message.find({ conversationId: conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: 'author',
            select: 'name surname profile_img'
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err })
              return next(err)
            }
            debug('Encontrado mensaje', message)
            fullConversations.push(message)
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations })
            }
          })
      })
    })
}

//Endpoint  GET  chat/:IdConversation
//Ver los detalles especificos de una sala de conversacion ( chat room)
const getConversation = function(req, res, next) {
  debug('Buscando Datos de la Conversacion')
  Message.find({ conversationId: req.params.conversationId })
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'name surname profile_img'
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      res.status(200).json({ conversation: messages })
    })
}

//endpoint POST chat
//Crear una nueva sala de conversacion, con un mensaje inicial para alguien
const newConversation = function(req, res, next) {
  debug('Creando Nueva conversacion')
  debug('Destinatario:', req.params.recipient)

  if (!req.params.recipient) {
    res.status(422).send({ error: 'Please choose a valid recipient for your message.' })
    return next()
  }

  if (!req.body.ChatMessage) {
    res.status(422).send({ error: 'Please enter a message.' })
    return next()
  }

  const conversation = new Conversation({
    participants: [req.UserId, req.params.recipient],
    creator: req.UserId,
    subject: req.body.subject
  })

  conversation.save(function(err, newConversation) {
    if (err) {
      res.send({ error: err })
      return next(err)
    }

    const message = new Message({
      ChatMessage: req.body.ChatMessage,
      conversationId: newConversation._id,
      author: req.UserId
    })

    message.save(function(err, newMessage) {
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id })
      return next()
    })
  })
}

//End Point POST /Chat/IdConversation
//Mensaje de respuesta sobre una chat room
const sendReply = function(req, res, next) {
  debug('Contestando en conversacion activa')
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.ChatMessage,
    author: req.UserId
  })

  reply.save(function(err, sentReply) {
    if (err) {
      res.send({ error: err })
      return next(err)
    }

    res.status(200).json({ message: 'Reply successfully sent!' })
    return next
  })
}

const deleteConversation = function(req, res, next) {
  debug('Eliminando toda la conversacion')
  Conversation.findOneAndRemove(
    {
      $and: [{ _id: req.params.conversationId }, { participants: req.UserId }]
    },
    function(err) {
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      res.status(200).json({ message: 'Conversation removed!' })
      return next()
    }
  )
}

const updateMessage = function(req, res, next) {
  debug('Modificando la conversacion')
  Conversation.find(
    {
      $and: [{ _id: req.params.messageId }, { author: req.UserId }]
    },
    function(err, message) {
      if (err) {
        res.send({ error: err })
        return next(err)
      }

      message.body = req.body.ChatMessage

      message.save(function(err, updatedMessage) {
        if (err) {
          res.send({ error: err })
          return next(err)
        }

        res.status(200).json({ message: 'Message updated!' })
        return next()
      })
    }
  )
}

module.exports = {
  getConversations,
  getConversation,
  newConversation,
  sendReply,
  deleteConversation,
  updateMessage
}
