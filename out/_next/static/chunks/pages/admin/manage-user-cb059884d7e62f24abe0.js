_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[44],{"2Uv3":function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/manage-user",function(){return a("DT3c")}])},DT3c:function(e,n,a){"use strict";a.r(n);var t=a("nKUr"),o=a("vJKn"),l=a.n(o),s=a("rg98"),r=a("q1tI"),c=a("Ktyj"),i=a("20a2"),u=a("KYPV"),h=a("i6E2"),d=a("i4t8"),m=a("mtPR"),j=a("um8N"),b=a("Kg+a"),x=a("A2So"),p=a("2zww"),f=a("UsYt"),O=a("5LSk");function C(){var e=Object(i.useRouter)(),n=Object(r.useState)(""),a=n[0],o=n[1],h=Object(r.useState)(!1),C=h[0],g=h[1],y=Object(u.a)({initialValues:{name:a.name,phone:a.phone,email:a.email,nationalID:a.nationalID,county:a.county,subCounty:a.subCounty},onSubmit:function(e){var n={name:e.name||a.name,phone:e.phone||a.phone,email:e.email||a.email,nationalID:e.nationalID||a.nationalID,county:e.county||a.county,subCounty:e.subCounty||a.subCounty};w(n),console.log("udate user values..",n)}}),w=function(){var n=Object(s.a)(l.a.mark((function n(a){var t;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=JSON.parse(localStorage.getItem("user")),n.next=3,c.c.collection("users").doc(t.id).update(a);case 3:e.push("users");case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(r.useEffect)((function(){o(JSON.parse(localStorage.getItem("user"))),c.a.onAuthStateChanged(function(){var n=Object(s.a)(l.a.mark((function n(a){return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a?g(!0):e.push("../login");case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}),[]),C?Object(t.jsx)("div",{children:Object(t.jsx)("form",{onSubmit:y.handleSubmit,children:Object(t.jsx)(m.a,{children:Object(t.jsx)(d.a,{xs:12,sm:12,md:8,children:Object(t.jsxs)(x.a,{children:[Object(t.jsx)(p.a,{color:"dark",children:Object(t.jsx)("h4",{className:v.cardTitleWhite,children:"Edit User"})}),Object(t.jsxs)(f.a,{children:[Object(t.jsxs)(m.a,{children:[Object(t.jsx)(d.a,{xs:12,sm:12,md:5,children:Object(t.jsx)(j.a,{labelText:"Name:",id:"name",onChange:y.handleChange,value:y.values.name||a.name,formControlProps:{fullWidth:!0}})}),Object(t.jsx)(d.a,{xs:12,sm:12,md:3,children:Object(t.jsx)(j.a,{labelText:"Phone:",id:"phone",name:"phone",onChange:y.handleChange,value:y.values.phone||a.phone,formControlProps:{fullWidth:!0}})}),Object(t.jsx)(d.a,{xs:12,sm:12,md:4,children:Object(t.jsx)(j.a,{labelText:"Email:",id:"email",onChange:y.handleChange,value:y.values.email||a.email,formControlProps:{fullWidth:!0}})})]}),Object(t.jsxs)(m.a,{children:[Object(t.jsx)(d.a,{xs:12,sm:12,md:6,children:Object(t.jsx)(j.a,{labelText:"National ID:",id:"nationalID",onChange:y.handleChange,value:y.values.nationalID||a.nationalID,formControlProps:{fullWidth:!0}})}),Object(t.jsx)(d.a,{xs:12,sm:12,md:6,children:Object(t.jsx)(j.a,{labelText:"County:",id:"county",onChange:y.handleChange,value:y.values.county||a.county,formControlProps:{fullWidth:!0}})}),Object(t.jsx)(d.a,{xs:12,sm:12,md:12,children:Object(t.jsx)(j.a,{labelText:"SubCounty:",id:"subCounty",onChange:y.handleChange,value:y.values.subCounty||a.subCounty,formControlProps:{fullWidth:!0}})})]})]}),Object(t.jsxs)(O.a,{children:[Object(t.jsx)(b.a,{type:"submit",color:"primary",children:"Update User"}),Object(t.jsx)(b.a,{color:"primary",onClick:function(){e.push("users"),localStorage.removeItem("user")},children:"exit"})]})]})})})})}):null}var v={cardTitleWhite:{color:"#FFFFFF",marginTop:"0px",minHeight:"auto",fontWeight:"300",fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif",marginBottom:"3px",textDecoration:"none"}};C.layout=h.a,n.default=C}},[["2Uv3",1,0,4,6,2,3,5,7,8]]]);