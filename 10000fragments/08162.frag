uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 20.37 - t * 6.24 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 16.73 - t * 6.24 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.88; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 27.62 - t * 2.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	p = rot2(2.18) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 2.23 + time * -0.20); }
	{ p = vec2(atan(p.y, p.x) * 2.44, length(p) * 2.89 - time * 0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.13 + time * 0.02, vec3(0.51, 0.44, 0.43), vec3(0.39, 0.39, 0.35), vec3(0.97, 0.95, 1.04), vec3(0.91, 0.51, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
