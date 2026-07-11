uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    float ma = sin(length(p - vec2(0.20, 0.0)) * 30.78 - t * 4.81 + ph);
    float mb = sin(length(p + vec2(0.20, 0.0)) * 37.58 - t * 4.81 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.54; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.79 - t * 1.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	p += vec2(-0.76, 0.69) * sin(length(p) * 2.81 - time * 1.63) * 0.34;
	{ float fr = length(p); p *= 1.0 + -0.35 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 4.39 - time * 0.78); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.86);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.49 + time * 0.03, vec3(0.45, 0.45, 0.58), vec3(0.44, 0.42, 0.38), vec3(0.75, 0.74, 1.31), vec3(0.74, 0.48, 0.31));
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
