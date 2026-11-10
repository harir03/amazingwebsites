import{cK as u,cL as S,cM as B,cN as I,cO as X,cP as Q,cQ as Y,cR as V,cS as U,cT as P,cU as k,cV as W,cW as y,cX as q,cY as M,cZ as T,c_ as O,c$ as N}from"./T7ii45zO.js";class _{m_w=123456789;m_z=987654321;mask=4294967295;constructor(e){this.m_w=123456789+e&this.mask,this.m_z=987654321-e&this.mask}random(e=1,t=0){this.m_z=36969*(this.m_z&65535)+(this.m_z>>16)&this.mask,this.m_w=18e3*(this.m_w&65535)+(this.m_w>>16)&this.mask;let n=(this.m_z<<16)+(this.m_w&65535)>>>0;return n/=4294967296,(e-t)*n+t}}class L{origin;orientation;length;radius;level;sectionCount;segmentCount;constructor(e=new u,t=new S,n=0,i=0,s=0,r=0,o=0){this.origin=e.clone(),this.orientation=t.clone(),this.length=n,this.radius=i,this.level=s,this.sectionCount=r,this.segmentCount=o}}const J={Oak:"oak"},R={Double:"double"},Z={Oak:"oak"},F={Deciduous:"deciduous",Evergreen:"evergreen"};class G{seed=0;type=F.Deciduous;bark={type:J.Oak,tint:16777215,flatShading:!1,textured:!0,textureScale:{x:1,y:1}};branch={levels:3,angle:{1:70,2:60,3:60},children:{0:7,1:7,2:5},force:{direction:{x:0,y:1,z:0},strength:.01},gnarliness:{0:.15,1:.2,2:.3,3:.02},length:{0:20,1:20,2:10,3:1},radius:{0:1.5,1:.7,2:.7,3:.7},sections:{0:12,1:10,2:8,3:6},segments:{0:8,1:6,2:4,3:3},start:{1:.4,2:.3,3:.3},taper:{0:.7,1:.7,2:.7,3:.7},twist:{0:0,1:0,2:0,3:0}};leaves={type:Z.Oak,billboard:R.Double,angle:10,count:1,start:0,size:2.5,sizeVariance:.7,tint:16777215,alphaTest:.5,rotationJitter:0,colorVariance:0};wind={scale:8,frequency:.6,branchAmplitude:.5,canopyAmplitude:.35,flutterAmplitude:.25,flutterFrequency:3};trellis={enabled:!1,position:{x:0,y:0,z:-2},width:10,height:20,spacing:2,force:{strength:.02,maxDistance:3,falloff:1},cylinderRadius:.05,visible:!0,color:9127187};copy(e,t=this){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&Object.prototype.hasOwnProperty.call(t,n)&&(typeof e[n]=="object"&&e[n]!==null?this.copy(e[n],t[n]):t[n]=e[n])}}const K=35729,$="deciduous",ee={type:"oak",tint:16774097,flatShading:!1,textured:!0,textureScale:{x:1,y:10}},te={levels:3,angle:{1:54,2:58,3:32},children:{0:6,1:4,2:3},force:{direction:{x:0,y:1,z:0},strength:-.01},gnarliness:{0:0,1:-.1,2:-.15,3:.09},length:{0:37.24,1:11.08,2:12.39,3:7.16},radius:{0:1.41,1:.9,2:.69,3:1.19},sections:{0:8,1:6,2:3,3:1},segments:{0:7,1:5,2:3,3:3},start:{1:.49,2:.06,3:.12},taper:{0:.73,1:.42,2:.69,3:.75},twist:{0:-.23,1:.42,2:0,3:0}},ne={type:"oak",billboard:"double",angle:42,count:18,start:.16,size:2.5,sizeVariance:.7,tint:14013901,alphaTest:.5},se={enabled:!1},ie={seed:K,type:$,bark:ee,branch:te,leaves:ne,trellis:se},oe={"Oak Medium":ie};function re(l){const e=oe[l];return e?structuredClone(e):new G}const ae=""+new URL("oak_ao_1k.Ckw69VRr.ktx2",import.meta.url).href,le=""+new URL("oak_color_1k.X86cJ5CF.ktx2",import.meta.url).href,ce=""+new URL("oak_normal_1k.CeTw_IV2.ktx2",import.meta.url).href,he=""+new URL("oak_roughness_1k.CbAHvXCg.ktx2",import.meta.url).href,ue=""+new URL("aspen_color.Cpgr1Q0w.png",import.meta.url).href,de=new I,pe=l=>{const e=new Q([],1,1);return Y().load(l,t=>{const{wrapS:n,wrapT:i}=e,{x:s,y:r}=e.repeat;e.copy(t),e.wrapS=n,e.wrapT=i,e.repeat.set(s,r),e.needsUpdate=!0}),e},E=(l,e=!0)=>{if(l.endsWith(".ktx2"))return pe(l);const t=de.load(l);return t.premultiplyAlpha=!0,e&&(t.colorSpace=X),t},A={bark:{oak:{ao:ae,color:le,normal:ce,roughness:he}},leaves:{aspen:ue}},C={bark:{},leaves:{}};function z(l,e,t={x:1,y:1}){if(!A.bark[l])throw new Error(`tree generator: bark "${l}" is stripped from the bundle, re-add its imports in generator/textures.ts`);C.bark[l]=C.bark[l]??{},C.bark[l][e]||(C.bark[l][e]=E(A.bark[l][e],e==="color"));const n=C.bark[l][e];return n.wrapS=B,n.wrapT=B,n.repeat.x=t.x,n.repeat.y=1/t.y,n}function me(l){if(!A.leaves[l])throw new Error(`tree generator: leaf "${l}" is stripped from the bundle, re-add its imports in generator/textures.ts`);return C.leaves[l]||(C.leaves[l]=E(A.leaves[l])),C.leaves[l]}class ve extends V{options;material;hCylinderGeo;vCylinderGeo;constructor(e){super(),this.name="Trellis",this.options=e,this.material=null,this.hCylinderGeo=null,this.vCylinderGeo=null}generate(){const e=this.options;this.dispose(),this.material=new U({color:e.color,roughness:.8}),this.hCylinderGeo=new P(e.cylinderRadius,e.cylinderRadius,e.width,8),this.hCylinderGeo.rotateZ(Math.PI/2),this.vCylinderGeo=new P(e.cylinderRadius,e.cylinderRadius,e.height,8);const t=Math.floor(e.height/e.spacing)+1;for(let i=0;i<t;i++){const s=i*e.spacing,r=new k(this.hCylinderGeo,this.material);r.position.set(e.position.x,e.position.y+s,e.position.z),this.add(r)}const n=Math.floor(e.width/e.spacing)+1;for(let i=0;i<n;i++){const s=-e.width/2+i*e.spacing,r=new k(this.vCylinderGeo,this.material);r.position.set(e.position.x+s,e.position.y+e.height/2,e.position.z),this.add(r)}}getNearestPoint(e){const t=this.options,n=t.position.x,i=t.position.y,s=t.position.z,r=n-t.width/2,o=n+t.width/2,a=i,c=i+t.height,d=Math.max(r,Math.min(o,e.x)),f=Math.max(a,Math.min(c,e.y)),x=Math.round((f-a)/t.spacing)*t.spacing+a,w=Math.max(a,Math.min(c,x)),p=Math.round((d-r)/t.spacing)*t.spacing+r,v=Math.max(r,Math.min(o,p)),g=new u(d,w,s),h=new u(v,f,s),m=e.distanceTo(g),b=e.distanceTo(h);return m<b?g:h}dispose(){this.children.forEach(e=>{e.geometry&&(e.geometry=null)}),this.clear(),this.hCylinderGeo&&(this.hCylinderGeo.dispose(),this.hCylinderGeo=null),this.vCylinderGeo&&(this.vCylinderGeo.dispose(),this.vCylinderGeo=null),this.material&&(this.material.dispose(),this.material=null)}}const D=`
// GLSL Simplex Noise 3D
// Source: https://github.com/ashima/webgl-noise

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float simplex3(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 g0 = vec3(a0.xy,h.x);
  vec3 g1 = vec3(a0.zw,h.y);
  vec3 g2 = vec3(a1.xy,h.z);
  vec3 g3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3)));
  g0 *= norm.x;
  g1 *= norm.y;
  g2 *= norm.z;
  g3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(g0,x0), dot(g1,x1),
                                dot(g2,x2), dot(g3,x3) ) );
}

// Spatially-varying sway along the wind direction. Sampling the noise at the
// UNDISPLACED position keeps every consumer (bark, leaves, glow) in the same
// wind field, so nothing detaches.
vec3 treeSway(vec3 pos, vec2 dir, float strength, float t, float freq, float scale, float amp) {
  float windOffset = 6.2831853 * simplex3(pos / scale);
  float sway = 0.5 * sin(t * freq + windOffset)
             + 0.3 * sin(2.0 * t * freq + 1.3 * windOffset)
             + 0.2 * sin(5.0 * t * freq + 1.5 * windOffset);
  vec3 d = normalize(vec3(dir.x, 0.25 * sin(windOffset), dir.y));
  return d * (sway * strength * amp);
}

// High-frequency per-leaf shiver, decorrelated by the leaf's random phase
float leafFlutter(float t, float phase, float freq) {
  float ph = phase * 6.2831853;
  return sin(t * (freq + phase * 2.0) + ph) * (0.6 + 0.4 * sin(t * 0.7 + ph * 1.7));
}
`;class ge extends V{rng;leafRng;options;branchQueue=[];branchesMesh;leavesMesh;trellisMesh;branches;leaves;constructor(e=new G){super(),this.name="Tree",this.branchesMesh=new k,this.leavesMesh=new k,this.trellisMesh=null,this.add(this.branchesMesh),this.add(this.leavesMesh),this.options=e}update(e){const t=this.leavesMesh.material.userData.shader;t&&(t.uniforms.uTime.value=e);const n=this.branchesMesh.material.userData.shader;n&&(n.uniforms.uTime.value=e)}loadPreset(e){const t=re(e);this.loadFromJson(t)}loadFromJson(e){this.options.copy(e),this.generate()}generate(){for(this.branches={verts:[],normals:[],indices:[],uvs:[],windFactor:[]},this.leaves={verts:[],normals:[],indices:[],uvs:[],windPhase:[],colors:[]},this.rng=new _(this.options.seed),this.leafRng=new _(this.options.seed+1),this.branchQueue.push(new L(new u,new S,this.options.branch.length[0],this.options.branch.radius[0],0,this.options.branch.sections[0],this.options.branch.segments[0]));this.branchQueue.length>0;){const e=this.branchQueue.shift();this.generateBranch(e)}this.createBranchesGeometry(),this.createLeavesGeometry(),this.createTrellis()}generateBranch(e){const t=this.branches.verts.length/3,n=e.orientation.clone(),i=e.origin.clone(),s=e.length/e.sectionCount/(this.options.type==="Deciduous"?this.options.branch.levels-1:1),r=[];for(let o=0;o<=e.sectionCount;o++){let a=e.radius;o===e.sectionCount&&e.level===this.options.branch.levels?a=.001:this.options.type===F.Deciduous?a*=1-this.options.branch.taper[e.level]*(o/e.sectionCount):this.options.type===F.Evergreen&&(a*=1-o/e.sectionCount);let c;for(let p=0;p<e.segmentCount;p++){const v=2*Math.PI*p/e.segmentCount,g=new u(Math.cos(v),0,Math.sin(v)).multiplyScalar(a).applyEuler(n).add(i),h=new u(Math.cos(v),0,Math.sin(v)).applyEuler(n).normalize(),m=new W(p/e.segmentCount,o%2===0?0:1);this.branches.verts.push(...Object.values(g)),this.branches.normals.push(...Object.values(h)),this.branches.uvs.push(...Object.values(m)),p===0&&(c={vertex:g,normal:h,uv:m})}this.branches.verts.push(...Object.values(c.vertex)),this.branches.normals.push(...Object.values(c.normal)),this.branches.uvs.push(1,c.uv.y),r.push({origin:i.clone(),orientation:n.clone(),radius:a}),i.add(new u(0,s,0).applyEuler(n));const d=Math.max(1,1/Math.sqrt(a))*this.options.branch.gnarliness[e.level];n.x+=this.rng.random(d,-d),n.z+=this.rng.random(d,-d);const f=new y().setFromEuler(n),x=new y().setFromAxisAngle(new u(0,1,0),this.options.branch.twist[e.level]),w=new y().setFromUnitVectors(new u(0,1,0),new u().copy(this.options.branch.force.direction));if(f.multiply(x),f.rotateTowards(w,this.options.branch.force.strength/a),this.options.trellis.enabled){const p=this.calculateTrellisForce(i,a);if(p){const v=new y().setFromUnitVectors(new u(0,1,0),p.direction);f.rotateTowards(v,p.strength)}}n.setFromQuaternion(f)}if(this.generateBranchIndices(t,e),this.options.type==="deciduous"){const o=r[r.length-1];e.level<this.options.branch.levels?this.branchQueue.push(new L(o.origin,o.orientation,this.options.branch.length[e.level+1],o.radius,e.level+1,e.sectionCount,e.segmentCount)):this.generateLeaf(o.origin,o.orientation)}e.level===this.options.branch.levels?this.generateLeaves(r):e.level<this.options.branch.levels&&this.generateChildBranches(this.options.branch.children[e.level],e.level+1,r)}generateChildBranches(e,t,n){const i=this.rng.random();for(let s=0;s<e;s++){const r=this.rng.random(1,this.options.branch.start[t]),o=Math.floor(r*(n.length-1)),a=n[o];let c;o===n.length-1?c=a:c=n[o+1];const d=(r-o/(n.length-1))/(1/(n.length-1)),f=new u().lerpVectors(a.origin,c.origin,d),x=this.options.branch.radius[t]*((1-d)*a.radius+d*c.radius),w=new y().setFromEuler(a.orientation),p=new y().setFromEuler(c.orientation),v=new S().setFromQuaternion(p.slerp(w,d)),g=2*Math.PI*(i+s/e),h=new y().setFromAxisAngle(new u(1,0,0),this.options.branch.angle[t]/(180/Math.PI)),m=new y().setFromAxisAngle(new u(0,1,0),g),b=new y().setFromEuler(v),j=new S().setFromQuaternion(b.multiply(m.multiply(h))),H=this.options.branch.length[t]*(this.options.type===F.Evergreen?1-r:1);this.branchQueue.push(new L(f,j,H,x,t,this.options.branch.sections[t],this.options.branch.segments[t]))}}generateLeaves(e){const t=this.rng.random();for(let n=0;n<this.options.leaves.count;n++){const i=this.rng.random(1,this.options.leaves.start),s=Math.floor(i*(e.length-1)),r=e[s];let o;s===e.length-1?o=r:o=e[s+1];const a=(i-s/(e.length-1))/(1/(e.length-1)),c=new u().lerpVectors(r.origin,o.origin,a),d=new y().setFromEuler(r.orientation),f=new y().setFromEuler(o.orientation),x=new S().setFromQuaternion(f.slerp(d,a)),w=2*Math.PI*(t+n/this.options.leaves.count),p=new y().setFromAxisAngle(new u(1,0,0),this.options.leaves.angle/(180/Math.PI)),v=new y().setFromAxisAngle(new u(0,1,0),w),g=new y().setFromEuler(x),h=new S().setFromQuaternion(g.multiply(v.multiply(p)));this.generateLeaf(c,h)}}generateLeaf(e,t){let n=this.leaves.verts.length/3;const i=this.options.leaves.size*(1+this.rng.random(this.options.leaves.sizeVariance,-this.options.leaves.sizeVariance)),s=i,r=i,o=this.options.leaves.rotationJitter,a=new S(this.leafRng.random(o,-o),this.leafRng.random(o*3,-o*3),this.leafRng.random(o,-o)),c=this.leafRng.random(),d=this.options.leaves.colorVariance,f=this.leafRng.random(),x=this.leafRng.random(),w=1-d*.5+f*d,p=[w*(1+(x-.5)*d*.4),w*(1-(x-.5)*d*.3),w*(1+(x-.5)*d*.5)],v=g=>{const h=[new u(-s/2,r,0),new u(-s/2,0,0),new u(s/2,0,0),new u(s/2,r,0)].map(b=>b.applyEuler(new S(0,g,0)).applyEuler(a).applyEuler(t).add(e));this.leaves.verts.push(h[0].x,h[0].y,h[0].z,h[1].x,h[1].y,h[1].z,h[2].x,h[2].y,h[2].z,h[3].x,h[3].y,h[3].z);const m=new u(0,0,1).applyEuler(t);this.leaves.normals.push(m.x,m.y,m.z,m.x,m.y,m.z,m.x,m.y,m.z,m.x,m.y,m.z),this.leaves.uvs.push(0,1,0,0,1,0,1,1),this.leaves.indices.push(n,n+1,n+2,n,n+2,n+3);for(let b=0;b<4;b++)this.leaves.windPhase.push(c),this.leaves.colors.push(p[0],p[1],p[2]);n+=4};v(0),this.options.leaves.billboard===R.Double&&v(Math.PI/2)}generateBranchIndices(e,t){let n,i,s,r;const o=t.segmentCount+1;for(let a=0;a<t.sectionCount;a++)for(let c=0;c<t.segmentCount;c++)n=e+a*o+c,i=e+a*o+(c+1),s=n+o,r=i+o,this.branches.indices.push(n,s,i,i,s,r)}createBranchesGeometry(){const e=new q;e.setAttribute("position",new M(new Float32Array(this.branches.verts),3)),e.setAttribute("normal",new M(new Float32Array(this.branches.normals),3)),e.setAttribute("uv",new M(new Float32Array(this.branches.uvs),2)),e.setIndex(new M(new Uint16Array(this.branches.indices),1)),e.computeBoundingSphere();const t=new T({name:"branches",flatShading:this.options.bark.flatShading,color:new O(this.options.bark.tint)});this.options.bark.textured&&(t.aoMap=z(this.options.bark.type,"ao",this.options.bark.textureScale),t.map=z(this.options.bark.type,"color",this.options.bark.textureScale),t.normalMap=z(this.options.bark.type,"normal",this.options.bark.textureScale),t.roughnessMap=z(this.options.bark.type,"roughness",this.options.bark.textureScale)),e.computeBoundingBox();const n=e.boundingBox.max.y,i=this.options.wind;t.onBeforeCompile=s=>{s.uniforms.uTime={value:0},s.uniforms.uWindDirection={value:new W(.85,.53)},s.uniforms.uWindStrength={value:1},s.uniforms.uWindSpeed={value:1},s.uniforms.uWindFrequency={value:i.frequency},s.uniforms.uWindScale={value:i.scale},s.uniforms.uBranchAmplitude={value:i.branchAmplitude},s.uniforms.uTreeHeight={value:n},s.vertexShader=`
        uniform float uTime;
        uniform vec2 uWindDirection;
        uniform float uWindStrength;
        uniform float uWindSpeed;
        uniform float uWindFrequency;
        uniform float uWindScale;
        uniform float uBranchAmplitude;
        uniform float uTreeHeight;
        `+s.vertexShader,s.vertexShader=s.vertexShader.replace("void main() {",D+`
        void main() {`),s.vertexShader=s.vertexShader.replace("#include <project_vertex>",`
        vec4 mvPosition = vec4(transformed, 1.0);

        float tW = uTime * uWindSpeed;
        float hFac = pow(clamp(position.y / uTreeHeight, 0.0, 1.0), 1.5);
        mvPosition.xyz += treeSway(position, uWindDirection, uWindStrength, tW, uWindFrequency, uWindScale, uBranchAmplitude) * hFac;

        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;
        `),t.userData.shader=s},this.branchesMesh.geometry.dispose(),this.branchesMesh.geometry=e,this.branchesMesh.material.dispose(),this.branchesMesh.material=t,this.branchesMesh.castShadow=!0,this.branchesMesh.receiveShadow=!0}createLeavesGeometry(){const e=new q;e.setAttribute("position",new M(new Float32Array(this.leaves.verts),3)),e.setAttribute("uv",new M(new Float32Array(this.leaves.uvs),2)),e.setIndex(new M(new Uint16Array(this.leaves.indices),1)),e.setAttribute("aWindPhase",new M(new Float32Array(this.leaves.windPhase),1)),e.setAttribute("color",new M(new Float32Array(this.leaves.colors),3)),e.computeVertexNormals(),e.computeBoundingSphere(),this.branchesMesh.geometry.computeBoundingBox();const t=this.branchesMesh.geometry.boundingBox.max.y,n=new T({name:"leaves",map:me(this.options.leaves.type),color:new O(this.options.leaves.tint),side:N,alphaTest:this.options.leaves.alphaTest,dithering:!0,vertexColors:this.options.leaves.colorVariance>0}),i=this.options.wind;n.onBeforeCompile=s=>{s.uniforms.uTime={value:0},s.uniforms.uWindDirection={value:new W(.85,.53)},s.uniforms.uWindStrength={value:1},s.uniforms.uWindSpeed={value:1},s.uniforms.uWindFrequency={value:i.frequency},s.uniforms.uWindScale={value:i.scale},s.uniforms.uBranchAmplitude={value:i.branchAmplitude},s.uniforms.uCanopyAmplitude={value:i.canopyAmplitude},s.uniforms.uFlutterAmplitude={value:i.flutterAmplitude},s.uniforms.uFlutterFrequency={value:i.flutterFrequency},s.uniforms.uTreeHeight={value:t},s.vertexShader=`
        uniform float uTime;
        uniform vec2 uWindDirection;
        uniform float uWindStrength;
        uniform float uWindSpeed;
        uniform float uWindFrequency;
        uniform float uWindScale;
        uniform float uBranchAmplitude;
        uniform float uCanopyAmplitude;
        uniform float uFlutterAmplitude;
        uniform float uFlutterFrequency;
        uniform float uTreeHeight;
        attribute float aWindPhase;
        `+s.vertexShader,s.vertexShader=s.vertexShader.replace("void main() {",D+`
        void main() {`),s.vertexShader=s.vertexShader.replace("#include <project_vertex>",`
        vec4 mvPosition = vec4(transformed, 1.0);

        float tW = uTime * uWindSpeed;
        float hFac = pow(clamp(position.y / uTreeHeight, 0.0, 1.0), 1.5);
        vec3 baseSway = treeSway(position, uWindDirection, uWindStrength, tW, uWindFrequency, uWindScale, uBranchAmplitude) * hFac;
        vec3 canopySway = treeSway(position, uWindDirection, uWindStrength, tW, uWindFrequency * 1.7, uWindScale * 0.35, uCanopyAmplitude) * uv.y;
        float fl = leafFlutter(tW, aWindPhase, uFlutterFrequency);
        vec3 flDir = normalize(vec3(sin(aWindPhase * 40.0), 0.5, cos(aWindPhase * 40.0)));
        mvPosition.xyz += baseSway + canopySway + flDir * (fl * uFlutterAmplitude * uWindStrength * uv.y);

        mvPosition = modelViewMatrix * mvPosition;
        gl_Position = projectionMatrix * mvPosition;
        `),n.userData.shader=s},this.leavesMesh.geometry.dispose(),this.leavesMesh.geometry=e,this.leavesMesh.material.dispose(),this.leavesMesh.material=n,this.leavesMesh.castShadow=!0,this.leavesMesh.receiveShadow=!0}createTrellis(){this.trellisMesh&&(this.remove(this.trellisMesh),this.trellisMesh.dispose(),this.trellisMesh=null),this.options.trellis.enabled&&this.options.trellis.visible&&(this.trellisMesh=new ve(this.options.trellis),this.trellisMesh.generate(),this.add(this.trellisMesh))}getNearestTrellisPoint(e){const t=this.options.trellis,n=t.position.x,i=t.position.y,s=t.position.z,r=n-t.width/2,o=n+t.width/2,a=i,c=i+t.height,d=Math.max(r,Math.min(o,e.x)),f=Math.max(a,Math.min(c,e.y)),x=Math.round((f-a)/t.spacing)*t.spacing+a,w=Math.max(a,Math.min(c,x)),p=Math.round((d-r)/t.spacing)*t.spacing+r,v=Math.max(r,Math.min(o,p)),g=new u(d,w,s),h=new u(v,f,s),m=e.distanceTo(g),b=e.distanceTo(h);return m<b?g:h}calculateTrellisForce(e,t){const n=this.options.trellis,i=this.getNearestTrellisPoint(e),s=e.distanceTo(i);if(s>n.force.maxDistance||s<.001)return null;const r=new u().subVectors(i,e).normalize(),o=1-Math.pow(s/n.force.maxDistance,n.force.falloff),a=n.force.strength*o/t;return{direction:r,strength:a}}get vertexCount(){return(this.branches.verts.length+this.leaves.verts.length)/3}get triangleCount(){return(this.branches.indices.length+this.leaves.indices.length)/3}}export{J as BarkType,R as Billboard,Z as LeafType,ge as Tree,G as TreeOptions,oe as TreePreset,F as TreeType,ve as Trellis};
