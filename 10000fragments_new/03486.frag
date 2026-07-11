uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.16; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.35 - t * 1.68 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.84; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.43 - t * 2.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.08;
	p = fract(p * 2.88) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.52; p = rot2(1.52) * p; }
	p = rot2(p.y * -2.39 + time * 0.77) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.98, lr * 1.54 + time * -0.58); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.95);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.25, vec3(0.43, 0.47, 0.46), vec3(0.42, 0.43, 0.48), vec3(0.80, 0.73, 0.73), vec3(0.47, 0.01, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
