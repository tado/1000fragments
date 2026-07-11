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
    vec2 tp = p * 9.95; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 10.20 - t * 0.73 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.26 * cos(sa * 3 + t * 0.79 + ph);
    v = sin((sr - petal) * 12.79);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.46) * p;
	p = rot2(p.y * -3.57 + time * 0.52) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.68 + time * 0.08, vec3(0.50, 0.50, 0.54), vec3(0.47, 0.46, 0.49), vec3(1.07, 0.97, 1.00), vec3(0.68, 0.99, 0.17));
	col = mod(col * 2.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
