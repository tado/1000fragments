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
    vec2 tp = p * 6.29; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 23.11 - t * 0.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.21, 0.95) * sin(length(p) * 2.15 - time * 1.35) * 0.16;
	p = rot2(p.y * 1.76 + time * 0.13) * p;
	p = rot2(time * -0.91) * p;
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.26, vec3(0.40, 0.54, 0.51), vec3(0.50, 0.43, 0.32), vec3(1.00, 0.94, 1.11), vec3(0.84, 0.60, 0.23));
	col = mod(col * 2.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
