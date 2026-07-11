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
    vec2 tp = p * 9.31; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.52 - t * 2.16 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.37; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 29.16 - t * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.26, length(p) * 5.22 - time * 0.30); }
	p = rot2(length(p) * -2.40 + time * 0.58) * p;
	p += vec2(-0.95, 0.46) * sin(length(p) * 2.31 - time * 0.98) * 0.27;
	p = rot2(time * -0.81) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.73 + time * 0.10, vec3(0.52, 0.59, 0.58), vec3(0.46, 0.36, 0.47), vec3(0.76, 0.76, 1.09), vec3(0.76, 0.43, 0.69));
	col = mod(col * 2.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
