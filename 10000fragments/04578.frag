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
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.43 + jf * 4.0), cos(t * 0.19 * jf)) * 0.60;
        xs += sin(length(p - im) * 76.29 - t * 11.76 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.26; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.20 - t * 2.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.29;
	p = rot2(p.y * 3.05 + time * 0.33) * p;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 2.63 - time * 0.27); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.83 + time * 0.10, vec3(0.52, 0.57, 0.51), vec3(0.46, 0.41, 0.32), vec3(0.73, 1.05, 1.12), vec3(0.38, 0.51, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
