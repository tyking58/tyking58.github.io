varying vec2 vUv;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float audio1;
uniform float adj;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform float orbOpacity;
uniform float centerOpacity;
uniform float objectScale;
uniform float intensity;
uniform float visible;

#define R(p, a) p = p * cos(a) + vec2(-p.y, p.x) * sin(a)
//#define R(p, a) p = p * cos(a) + vec2(-p.y, p.x) * sin(a)
#define time iTime * 0.1 
#define tau 6.2831853

mat2 makem2(in float theta){float c = cos(theta);float s = sin(theta);return mat2(c,-s,s,c);}
float noise( in vec2 x ){return texture2D(iChannel0, x*.01).x;}
mat2 m2 = mat2( .80,  0.80, -0.80,  .80 );

float grid(vec2 p)
{
  float s = sin(p.x)*cos(p.y);
  return s;
}

float flow(in vec2 p)
{
  float z=4.;
  float rz = 0.;
  vec2 bp = p;
  for (float i= 1.;i < 8.;i++ )
  {
    bp += time*1.5;
    vec2 gr = vec2(grid(p*3.-time*2.),grid(p*3.+4.-time))*0.4;
    gr = normalize(gr)*0.4;
    gr *= makem2((p.x+p.y)*.3+time*10.);
    p += gr*0.2;
    
    rz+= (sin(noise(p)*2.)*0.5+0.5) /z;
    
    p = mix(bp,p,.5);
    z *= 1.5;
    p *= 2.5;
    p*=m2;
    bp *= 2.5;
    bp*=m2;
  }
  return rz;  
}

float spiral(vec2 p,float scl) 
{
  float r = length(p);
  r = log(r);
  float a = atan(p.y, p.y);
  return abs(mod(scl*(r-2./scl*a),tau)-1.)*1.;
}


float Sin01(float t) {
    return .5 + 0.5 * sin(6.28319 * t );
}

float SineEggCarton(vec3 p) {
    return .1 + abs(sin(p.y) + cos(p.y) - sin(p.y)) * 4.0 * orbOpacity;
    //return .1 + abs(sin(p.x) - cos(p.y) + sin(p.z)) * 1.2 * orbOpacity;
    //return .5 + abs(sin(p.x) - cos(p.y) + sin(p.z)) * (1.0 * p.z) / (3.0 + spiral(p.xy, p.z));
}

float displacement(vec3 p, float scale, float scale2) {
    float mag = 0.9 * 0.25*Sin01(scale2*-p.y + scale2-0.1 * iTime);
    //float mag = 0.5 * 0.25*Sin01(scale2*-p.y + scale2-0.1 * iTime) + -p.x + p.z;
    //float mag = 0.01;
    //float ds1 = sin(-iTime * 0.5 + p.y) * cos(-iTime * 0.7 + p.x) * sin(0.2 *p.z);
    //float ds2 = sin(0.2 * scale * p.x) * cos(0.2 * scale * p.y) * -sin(0.2 *p.z);
    //return ds1 + ds2;
    return mag;
}

//float Map(vec3 p, float scale) {
//    float dSphere = length(p) - 1.0;
//    //float dSphere = length(p) - 1.0;
//    return dSphere;
//    //return max(dSphere, (.85 - SineEggCarton(scale * p)) / scale);
//}

float sdBox(vec3 p, vec3 b, float scale)
{
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
    return max(length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0), (.85 - SineEggCarton(scale * p)) / scale);
}

float sdTorus(vec3 p, vec2 t, float scale)
{
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return max(length(q) - t.y, (.85 - SineEggCarton(scale * p)) / scale);
}

float sdCappedCylinder(vec3 p, float h, float r, float scale)
{
    vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(h, r);
    return max(min(max(d.x, d.y), 0.0) + length(max(d, 0.0)), (.85 - SineEggCarton(scale * p)) / scale);
}

float sdCylinder(vec3 p, vec3 c, float scale)
{
    //return length(p.xz - c.xy) - c.z;
    return max(length(p.xz - c.xy) - c.z, (.85 - SineEggCarton(scale * p)) / scale);
}

float sdOctahedron(vec3 p, float s, float scale)
{
    p = abs(p);
    //return (p.x + p.y + p.z - s) * 0.57735027;
    return max((p.x + p.y + p.z - s) * 0.57735027, (.85 - SineEggCarton(scale * p)) / scale);
}

float sdSphere(vec3 p, float s, float scale)
{
    return length(p) - s;
    //return max(length(p) - s, (.85 - SineEggCarton(scale * p)) / scale);
}

vec3 GetColor(vec3 p) {
    float amount = clamp((1.7 - length(p)) / 1.7, 0.0, 1.5);

    vec3 col = 0.6 + 0.5 * cos(6.28319 * (vec3(0.1, 0.0, 0.0) + amount * vec3(1.0, 0.9, 0.8)));
    //vec3 col = 0.5 + 0.5 * cos(6.28319 * (vec3(0.2, 0.0, 0.0) + amount * (audio1*.6) * vec3(1.0, 0.9, 0.8)));
    return col * amount;
}

float opUnion(float d1, float d2) {
    return min(d1, d2);
}

float opSmoothUnion(float d1, float d2, float k) {
    float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2, d1, h) - k * h * (1.0 - h);
}

float opSubtraction(float d1, float d2) {
    return max(-d1, d2);
}

float opSmoothSubtraction(float d1, float d2, float k) {
    float h = clamp(0.5 - 0.5 * (d2 + d1) / k, 0.0, 1.0);
    return mix(d2, -d1, h) + k * h * (1.0 - h);
}

void main() {
    vec2 coord = gl_FragCoord.xy;
    coord.x-=(iMouse.x*.003);
    coord.y+=(iMouse.y*.003);


    //Ring Light (Not seen, remove p.y+=.8 to see)
    vec2 p = coord / iResolution.xy - 0.5;
    p.x *= iResolution.x / iResolution.y;
    p *= .5;
    p.y += .8;
    float rz = flow(p);
    p /= exp(mod(2.1, 2.1));
    rz *= (3. - spiral(p, .5)); // intensity / thickness of ring
    vec3 col = vec3(0.0, 0.0, 0.05) / rz; // colors
    col = pow(abs(col), vec3(1.05)) - (abs((iMouse.x)) * .00001);
    gl_FragColor+= vec4(col,1.0);


    //Normalized point (between 0 and 1)
    vec3 rd = normalize(vec3(2.0 * coord - iResolution.xy, -iResolution.y*3.0));
    //vec3 rd = normalize(vec3(2.0 * coord - iResolution.xy, -iResolution.y));
    // cy = cylinder, co = central object
    vec3 rd_cy = rd;
    vec3 rd_co = rd;
    vec3 rd_cs = rd;
    vec3 rd_cb = rd;


    //Controls relative location of sphere
    //vec3 ro = vec3(0, 0, 1.85);
    //vec3 ro = vec3(-iMouse.y * .00004, -iMouse.x * .00004, -1.4 * (1.0 - orbOpacity) - .5 + mix(2.5, 2.0, adj + Sin01((0.05) * iTime)));
    vec3 ro_cy = vec3(0.0, 0.0, 1.8);
    vec3 ro_co = vec3(-iMouse.y * .00004, -iMouse.x * .00004, -1.2 * (1.0 - orbOpacity * 0.05) - .5 + mix(2.3, 2.2, adj + Sin01((0.05) * iTime)));
    vec3 ro_cs = vec3(-iMouse.y * .00004, -iMouse.x * .00004, 0.2);
    vec3 ro_cb = vec3(-iMouse.y * .00004, -iMouse.x * .00004, -1.2 * (1.0 - orbOpacity * 0.05) - .5 + mix(2.3, 2.2, adj + Sin01((0.05) * iTime)));

    //Sphere Rotation
    rd_cy = vec3(-rd.y, rd.x, rd.z);
    rd_co = vec3(-rd.y, rd.x, rd.z + 0.7);
    rd_cs = vec3(-rd.y, rd.x, rd.z);
    rd_cb = vec3(-rd.y, rd.x, rd.z);

    R(rd_co.xz, visible * 5.0);
    R(ro_co.xz, visible * 5.0);
    R(ro_co.yz, visible * 5.0);
    R(rd_co.yz, visible * 5.0);

    R(rd_co.xz, 0.05 * iTime);
    R(ro_co.xz, 0.05 * iTime);
    R(rd_co.yz, 0.05 * iTime);
    R(ro_co.yz, 0.05 * iTime);

    //R(rd_cb.xz, 0.3);
    //R(ro_cb.xz, 0.3);
    //R(rd_cb.yz, 0.1 * iTime);
    //R(ro_cb.yz, 0.1 * iTime);
    
    float t = 0.0;
    //gl_FragColor.rgb = vec3(0.0);

    //Sine Wave Scale
    //float scale = 20.0;
    float scale = (mix(1.5, 24.0 * (orbOpacity * orbOpacity), Sin01(0.3 * iTime * (.1)))) * visible * centerOpacity;
    float scale2 = mix(1.5,2.0,Sin01(0.5 * iTime*(.2)));

    for (int i = 0; i < 80; i++) {

        //vec3 p = ro * t + rd; // //(orbOpacity) is more solid lines
        //vec3 p = ro + t * rd; // //(orbOpacity) is more solid lines
        vec3 p_cy = ro_cy + t * rd_cy;
        vec3 p_co = ro_co + t * rd_co;
        vec3 p_cs = ro_cs + t * rd_cs;
        vec3 p_cb = ro_cb + t * rd_cb;

        float d1 = sdCylinder(vec3(p_cy.x, p_cy.y, p_cy.z), vec3(0.0, -0.4,0.5), scale);
        float d2 = displacement(vec3(-p_cy.x * 0.5, -p_cy.y, p_cy.z), scale, 0.3 * scale2);
        
        float d3 = sdCylinder(vec3(p_cy.x, p_cy.y, -p_cy.z), vec3(0.0, 1.4, 1.0), scale);
        float d4 = displacement(vec3(p_cy.xy, p_cy.z), scale, 0.3 * scale2);
        
        float d5 = sdCylinder(vec3(-p_cy.x, -p_cy.y, p_cy.z), vec3(0.0, 0.1, 0.35), scale);
        float d6 = displacement(vec3(p_cy.xy, p_cy.z), scale, 0.2 * scale2);

        float d9 = sdOctahedron(p_co, objectScale, scale);
        float d10 = sdSphere(p_cs, 0.5 * visible, scale);
        //float d11 = sdBox(p_cb, vec3(objectScale / 40.0), scale);
        float d12 = sdSphere(p_cs, 2.0 * visible, scale);

        float dt1 = d1 + d2;
        float dt2 = d3 + d4;
        float dt3 = d6 + d5;

        float cy_union_01 = opUnion(dt2, dt3);
        float cy_union_02 = opUnion(cy_union_01, dt1);
        float sph_oct_subtract = opSmoothSubtraction(d10, d9, 0.1);
        float sph_cy_subtract = opSubtraction(d12, cy_union_02);
        float subtract_union = opUnion(sph_oct_subtract, sph_cy_subtract);

        float d = subtract_union; 
        
        if (d < 0.00005) {
            break;
        }

        t += 0.8 * d;

        gl_FragColor.rgb += (0.020 * GetColor(p_co)) * orbOpacity;
        //gl_FragColor.rgb += (0.06 * GetColor(p) * (audio1 * .6)) * orbOpacity;

        //Controls the red color when mouse is close to center
        //gl_FragColor.b-=(abs((iMouse.x ))*.000002);
        //gl_FragColor.r-=(abs((iMouse.x ))*.000005);
        //gl_FragColor.g-=(abs((iMouse.x ))*.000002);
        //float total = (gl_FragColor.r+gl_FragColor.g+gl_FragColor.b) / 3.0;
        //gl_FragColor.rgb = vec3(total,total,total);
    }
}