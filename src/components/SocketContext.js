import { createContext, useEffect, useState } from "react";
import { useRef} from "react"
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const  SocketContext = createContext();

const URL = "http://localhost:5000/"
//const URL = "https://web-rtc-test-learn-1.onrender.com/"
const socket = io(URL)

const ContextProvider = ({ children }) =>{
    const [stream,setStream] = useState(null);
    const [meStream,setmeStream] = useState(null)
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
                setmeStream(currentStream)
                // MyVideo.current.srcObject = currentStream;
            const remoteVideo = document.getElementById('myVideoPre');
            remoteVideo.srcObject = currentStream;
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

            socket.on('ENDCALL',()=>{
                window.location.reload();
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

        peer.on('connect',()=>{
            console.log("peer connected")
        })

        peer.on('signal',(data) => {
            socket.emit('AnswerCall',{ 
                signal: data,
                to : call.from
            })
        });

        peer.on('stream', remoteStream => {
            // Display the remote stream in a video element
            // Note: This assumes you have a video element with the ref "remoteVideo" in your component
            const remoteVideo = document.getElementById('remoteVideo');
            if (remoteVideo) {
              remoteVideo.srcObject = remoteStream;
            }
          });

        peer.signal(call.signal)

        connectionRef.current = peer;
        setCallEnded(false)
        
        const remoteVideo = document.getElementById('myVideo');
            remoteVideo.srcObject = meStream;
    };

    
    // To call someone
    const CallUser = (id) =>{
        console.log("Calling")
        const peer = new Peer({
            initiator : true, //  creatring a call
            trickle : false,  //
            stream   // to pass the signal info from {CallUser}
        });

        peer.on('connect',()=>{
            console.log("peer connected")
        })
        peer.on('signal',(data) => {
            socket.emit('CallUser',{ 
                userToCall : id,
                signalData : data,
                from : Me,
                name 
            })
        });

        peer.on('stream',(remoteStream) => {
            const remoteVideo = document.getElementById('remoteVideo');
            if (remoteVideo) {
              remoteVideo.srcObject = remoteStream;
            }
          });

        socket.on('callAccepted',(signal)=>{
            console.log(signal)
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;

        const remoteVideo = document.getElementById('myVideo');
            remoteVideo.srcObject = meStream;
    };

    // To end current call
    const EndCall = () =>{
        setCallEnded(true);
        socket.emit("ENDCALL",(call.from))
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