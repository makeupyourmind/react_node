import usersRouter from './users';
import contactRouter from './contact-list';

export default function(app){

    app.use('/users', usersRouter);
    app.use('/contacts', contactRouter)

}