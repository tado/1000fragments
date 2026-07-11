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
    vec2 tp = p * 9.91; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.38 - t * 0.94 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.16 * cos(sa * 7 + t * 1.50 + ph);
    v = sin((sr - petal) * 10.64);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	{ float fr = length(p); p *= 1.0 + -0.21 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.58, length(p) * 3.57 - time * 0.78); }
	p = fract(p * 1.18) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = d1 + d2;
	vec3 col = palette(d * 1.50 + time * 0.01, vec3(0.50, 0.48, 0.46), vec3(0.35, 0.49, 0.47), vec3(0.82, 0.88, 0.91), vec3(0.04, 0.85, 0.32));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
