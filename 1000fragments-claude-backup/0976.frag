uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
    vec2 st=gl_FragCoord.xy/resolution.xy;
    float v=0.0;
    for(int i=0;i<3;i++){
        float a=6.28318*float(i)/3.0000;
        vec2 src=vec2(0.5+cos(a)*0.3, 0.5+sin(a)*0.3);
        v+=sin(length(st-src)*16.4000-time*5.1000);
    }
    v=v/3.0000;
    vec3 rgb=hsb2rgb(vec3(v*0.5+0.5+time*0.1, 0.85, 0.9));
    fragColor = TDOutputSwizzle(vec4(clamp(rgb,0.0,1.0),1.0));
}