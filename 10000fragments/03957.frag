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
    float ma = sin(length(p - vec2(0.51, 0.0)) * 25.09 - t * 3.13 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 35.14 - t * 3.13 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.29; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.99 - t * 2.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.20, lr * 2.78 + time * -0.54); }
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 4.26 - time * 0.77); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.67);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.96 + time * 0.08, vec3(0.52, 0.41, 0.42), vec3(0.45, 0.30, 0.41), vec3(1.39, 1.04, 0.86), vec3(0.32, 0.73, 0.54));
	col = mod(col * 2.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
