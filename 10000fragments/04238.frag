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
    v = 0.5 * (sin(p.x * 12.19 + t * 2.69 + ph) + sin(p.y * 12.93 - t * 1.34 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.39; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 10.64 - t * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	{ float fr = length(p); p *= 1.0 + 0.25 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.26, vec3(0.44, 0.53, 0.59), vec3(0.40, 0.45, 0.32), vec3(0.75, 0.97, 1.19), vec3(0.93, 0.86, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
