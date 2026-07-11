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
    vec2 cq = p * 15.87 + vec2(t * 2.54, -t * 2.54) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.51; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 29.64 - t * 1.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 1.84 * p.y + time * 1.02); p.y += 0.24 / wf * cos(wf * 2.35 * p.x + time * 0.99); }
	p = rot2(length(p) * 1.08 + time * 0.49) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.71);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.35 + time * 0.16, vec3(0.57, 0.59, 0.59), vec3(0.37, 0.46, 0.30), vec3(0.81, 0.98, 1.34), vec3(0.31, 0.93, 0.92));
	col = mod(col * 2.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
