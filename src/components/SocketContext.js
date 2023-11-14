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
    const [name,setname] = useState(localStorage.getItem('MyName')||"")
    const [callEnded,setCallEnded] = useState(true)
    const [All_Onlines,setOnlines] = useState([])
    const [callerID,setCallerID] = useState(null)
    const [OtherName,setOthername] = useState("");

    const connectionRef = useRef();

    useEffect(()=>{
        socket.emit('newly_joined');
        socket.on('newly_joined',(data)=>{
            //console.log("Fghv: ",data)
            setOnlines(data)
        })
    socket.on('disconnect',()=>{
            console.log("disconnected: ",socket.id);
        })
    },[socket])


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
                const remoteVideo = document.getElementById('myVideoPre');
                //remoteVideo.srcObject = currentStream;
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
                setOthername(callerName);
                setCallerID(from);
                console.log("from",from)
                //console.log({ isReceivingCall: true, from, name: callerName, signal })
                OffCall();
            });

            socket.on('ENDCALL',()=>{
                window.location.reload();
            })
        },[socket])
        
    const OffCall=()=>{
        setTimeout(()=>{
            setCall({})
        },10000)
    }

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
                to : call.from,
                from : Me 
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

        socket.on('callAccepted',(data)=>{
            console.log(data.signal)
            setCallAccepted(true);
            peer.signal(data.signal);
            console.log("callers :",data.from);
        });
        connectionRef.current = peer;

        const remoteVideo = document.getElementById('myVideo');
            remoteVideo.srcObject = meStream;
    };

    // To end current call
    const EndCall = () =>{
        setCallEnded(true);
        console.log({
            me :Me,
            other : callerID,
            name : name
        })
        socket.emit("ENDCALL",(callerID,Me))

        window.location.reload();
    }



    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            stream,
            name,
            setname,
            callEnded,
            Me,
            CallUser,
            EndCall,
            AnswerCall,
            All_Onlines,
            setOnlines,
            setCall,
            OtherName
            
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider , SocketContext}