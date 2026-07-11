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
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.26 * cos(sa * 5 + t * 2.43 + ph);
    v = sin((sr - petal) * 8.35);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.84; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.97 - t * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.98;
	p = abs(p) - 0.67;
	p = rot2(p.y * 3.79 + time * 0.29) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.62);
	float d = d1 * d2;
	vec3 col = palette(d * 1.30 + time * 0.05, vec3(0.54, 0.51, 0.51), vec3(0.39, 0.46, 0.46), vec3(0.87, 1.32, 0.99), vec3(0.10, 0.62, 0.06));
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
