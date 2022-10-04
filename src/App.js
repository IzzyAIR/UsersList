import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState('');


  React.useEffect (()=> {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(json => {
      setUsers(json.data);
    }).catch(err => {
      console.warn(err);
      // alert('Ошибка при получени пользователей');
    })
    .finally(() => {setLoading(false)});
  })

  const onChangeSearch = (event) => {
    setSearchVal(event.target.value);
  }  

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }


  const onClickSendInvites = ( ) => {
    setSuccess(true);
  }
  return (
    <div className="App">

      {success ? (<Success count = {invites.length} />) : 
        (<Users 
          invites={invites}
          onClickInvite={onClickInvite}
          onChangeSearch={onChangeSearch} 
          searchVal={searchVal} 
          items = {{users}} 
          isLoading={isLoading}
          onClickSendInvites={onClickSendInvites}/>)
      }

      
      {/*  */}
    </div>
  );
}

export default App;
