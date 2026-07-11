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
    vec2 tp = p * 6.80; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.65 - t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.12; p = rot2(0.47) * p; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.73 * p.y + time * 1.06); p.y += 0.50 / wf * cos(wf * 1.59 * p.x + time * 1.32); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.12, vec3(0.49, 0.41, 0.57), vec3(0.42, 0.36, 0.42), vec3(0.98, 1.35, 1.11), vec3(0.72, 0.01, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
