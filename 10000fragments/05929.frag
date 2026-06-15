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
    vec2 cq = p * 5.14 + vec2(t * 1.55, -t * 1.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.45; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 9.34 - t * 2.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.65 * p.y + time * 1.52); p.y += 0.25 / wf * cos(wf * 3.37 * p.x + time * 1.51); }
	p = fract(p * 2.43) - 0.5;
	p = rot2(0.50) * p;
	p = rot2(p.y * -1.23 + time * 0.21) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.66 + time * 0.00, vec3(0.48, 0.51, 0.40), vec3(0.44, 0.48, 0.49), vec3(1.04, 1.21, 1.18), vec3(0.89, 0.53, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
