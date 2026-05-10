import React from "react";

export default function Loader() {
  return (
    <div style={{ maxWidth:600,margin:"0 auto" }}>
      {[1,2,3].map(i=>(
        <div key={i} style={{ background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--radius-lg)",padding:20,marginBottom:16,opacity:1-i*0.15 }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
            <div className="skeleton" style={{ width:42,height:42,borderRadius:"50%",flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div className="skeleton" style={{ height:13,width:"40%",marginBottom:6 }}/>
              <div className="skeleton" style={{ height:11,width:"25%" }}/>
            </div>
          </div>
          <div className="skeleton" style={{ height:13,width:"90%",marginBottom:8 }}/>
          <div className="skeleton" style={{ height:13,width:"70%",marginBottom:8 }}/>
          <div className="skeleton" style={{ height:160,width:"100%",marginTop:12 }}/>
        </div>
      ))}
    </div>
  );
}