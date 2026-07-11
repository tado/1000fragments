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
    vec2 tp = p * 8.46; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.12 - t * 2.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 23.10 - t * 2.45 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 19.58 - t * 2.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.05, -0.04) * sin(length(p) * 5.17 - time * 0.96) * 0.32;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.26 + time * 0.31); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.47 + time * 0.09, vec3(0.47, 0.50, 0.42), vec3(0.48, 0.49, 0.41), vec3(0.95, 1.18, 0.86), vec3(0.29, 0.34, 0.79));
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
