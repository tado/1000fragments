uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

#define PI 3.14159265359

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(random(i), random(i + vec2(1.0, 0.0)), f.x),
               mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x), f.y);
}

float sdBox( vec2 p, vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdCircle( vec2 p, float r ) {
    return length(p) - r;
}

vec2 hash( vec2 p ) {
	p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float cellular(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float F1 = 8.0;
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i),float(j));
            vec2 o = hash( n + g );
            o = 0.5 + 0.5*sin( time + 6.2831*o );
            float d = length(g - f + o);
            if(d<F1) {
                F1 = d;
            }
        }
    }
    return F1;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot2 = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(x);
        x = rot2 * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
    
    uv *= rot(length(uv) + time);
    
    float a = atan(uv.y, uv.x); float r = 0.76 + 0.18 * sin(a * 3.00 + time); float d = length(uv) - r; d = smoothstep(0.0, 0.02, d);
    
    vec3 col = mix(vec3(0.9, 0.4, 0.1), vec3(0.1, 0.7, 0.8), d);
    
    vec4 finalColor = vec4(col, 1.0);
    fragColor = TDOutputSwizzle(finalColor);
}
