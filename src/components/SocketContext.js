import { createContext, useEffect, useState } from "react";
import { useRef} from "react"
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const  SocketContext = createContext();

const URL = "http://localhost:5000/"
const socket = io(URL)

const ContextProvider = ({ children }) =>{
    const [stream,setStream] = useState(null);
    const [Me,setMe] = useState("");
    const [call,setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [name,setname] = useState("")
    const [callEnded,setCallEnded] = useState(true)
    const MyVideo = useRef();
    const UserVideo = useRef();
    const connectionRef = useRef();
    // To get permissions to access camera and microphone.
    useEffect(()=>{
        // to get my socket id when connected .
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
            .then((currentStream) => {
                setStream(currentStream);
                MyVideo.current.srcObject = currentStream;
            })
            .catch((err)=>{
                console.log(err)
            });

        socket.on('me',(id)=>{
            console.log(id)
            setMe(id);
        })
        }, []);
        useEffect(()=>{
            //recive calls
            socket.on('getCalls', ({ from, name: callerName, signal }) => {
                setCall({ isReceivingCall: true, from, name: callerName, signal });
                console.log({ isReceivingCall: true, from, name: callerName, signal })
            });

            socket.on('callended',()=>{
                UserVideo.current = null;
            })
        },[socket])
        
    // To answer an incomming call
    const AnswerCall = () =>{
        setCallAccepted(true);
        const peer = new Peer({
            initiator : false, // Not creatring a call we are answering
            trickle : false,  //
            stream   
        });

        peer.on('signal',(data) => {
            socket.emit('AnswerCall',{ 
                signal: data,
                to : call.from
            })
        });

        peer.on('stream',(currentStream) => {
            UserVideo.current.srcObject = currentStream;
            console.log(currentStream)
        });

        peer.signal(call.signal)

        connectionRef.current = peer;
        setCallEnded(false)
    };

    
    // To call someone
    const CallUser = (id) =>{
        console.log("Calling")
        const peer = new Peer({
            initiator : true, //  creatring a call
            trickle : false,  //
            stream   // to pass the signal info from {CallUser}
        });

        peer.on('signal',(data) => {
            socket.emit('CallUser',{ 
                userToCall : id,
                signalData : data,
                from : Me,
                name 
            })
        });

        peer.on('stream',(currentStream) => {
            UserVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted',(signal)=>{
            console.log(signal)
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };

    // To end current call
    const EndCall = () =>{
        socket.broadcast.emit('callended')
        setCallEnded(true);
        connectionRef.current.destroy()
        window.location.reload();
    }



    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            MyVideo,
            UserVideo,
            stream,
            name,
            setname,
            callEnded,
            Me,
            CallUser,
            EndCall,
            AnswerCall,
            
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider , SocketContext}