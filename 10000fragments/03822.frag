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
    v = 0.25 * (sin(p.x * 3.49 + t * 1.32 + ph) + sin(p.y * 6.47 - t * 1.32 + ph)
        + sin((p.x + p.y) * 3.41 + t * 1.32 + ph) + sin(length(p) * 4.14 - t * 1.32 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.59; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 13.36 - t * 3.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 4.35 - time * 0.61); }
	p = rot2(time * -1.33) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(2.39) * p; }
	p = abs(p) - 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.92);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.25 + time * 0.11, vec3(0.51, 0.54, 0.44), vec3(0.43, 0.43, 0.45), vec3(0.90, 1.21, 0.95), vec3(0.19, 0.30, 0.51));
	col = fract(col * 2.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
