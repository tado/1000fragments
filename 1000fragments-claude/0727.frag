uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main(){
    vec2 st=gl_FragCoord.xy/resolution.xy;
    vec2 p1=vec2(0.3000+sin(time*0.6000)*0.12,0.5000+cos(time*0.4800)*0.1);
    vec2 p2=vec2(0.7000+sin(time*0.7200+1.57)*0.12,0.5000+cos(time*0.6000+1.57)*0.1);
    vec2 d1=(st-p1), d2=(st-p2);
    float r1sq=dot(d1,d1)+0.001, r2sq=dot(d2,d2)+0.001;
    vec2 B=(d1/r1sq)-(d2/r2sq);
    float mag=clamp(length(B)*0.08,0.0,1.0);
    float fieldAngle=atan(B.y,B.x);
    vec3 rgb=vec3(abs(cos(fieldAngle*2.0)),mag,abs(sin(fieldAngle*3.0)));
    fragColor=TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}