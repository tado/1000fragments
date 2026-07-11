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
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.12; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.63 - t * 1.01 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.16; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.66 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.40; p = rot2(0.61) * p; }
	p = rot2(p.y * -2.85 + time * 0.54) * p;
	p *= 3.13;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.03);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.88 + time * 0.11, vec3(0.44, 0.42, 0.55), vec3(0.33, 0.36, 0.38), vec3(0.72, 0.77, 1.18), vec3(0.65, 0.89, 0.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
