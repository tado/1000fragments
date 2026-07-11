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
    vec2 tp = p * 9.24; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.76 - t * 2.90 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.43, t * 0.34 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.65;
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 5.50 - time * 0.17); }
	p = rot2(length(p) * -2.17 + time * 1.14) * p;
	p += vec2(0.23, -0.96) * sin(length(p) * 2.06 - time * 1.15) * 0.15;
	p = rot2(0.98) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.96 + time * 0.06, vec3(0.54, 0.52, 0.48), vec3(0.42, 0.34, 0.43), vec3(1.13, 1.05, 1.17), vec3(0.24, 0.51, 0.31));
	col = mod(col * 1.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
