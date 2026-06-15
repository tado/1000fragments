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
    vec2 tp = p * 4.52; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.72 - t * 0.78 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.79;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.77 * p.y + time * 1.67); p.y += 0.27 / wf * cos(wf * 1.64 * p.x + time * 1.56); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(0.43) * p; }
	p = rot2(length(p) * -1.47 + time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.12, vec3(0.55, 0.44, 0.50), vec3(0.35, 0.47, 0.37), vec3(1.04, 1.22, 1.20), vec3(0.99, 0.33, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
