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
    float ma = sin(length(p - vec2(0.22, 0.0)) * 22.99 - t * 1.61 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 23.09 - t * 1.61 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.92; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 21.82 - t * 1.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	p *= 2.16;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.30, lr * 1.30 + time * 0.74); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.05);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.25 + time * 0.04, vec3(0.45, 0.56, 0.43), vec3(0.46, 0.32, 0.46), vec3(0.87, 0.73, 1.32), vec3(0.97, 0.55, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
