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
    vec2 tp = p * 6.59; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 10.61 - t * 3.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	p = rot2(time * 1.15) * p;
	p += vec2(0.81, 0.92) * sin(length(p) * 4.32 - time * 0.52) * 0.21;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.56 * p.y + time * 0.84); p.y += 0.30 / wf * cos(wf * 3.60 * p.x + time * 1.81); }
	{ p = vec2(atan(p.y, p.x) * 1.90, length(p) * 3.73 - time * 0.80); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.20, vec3(0.45, 0.59, 0.59), vec3(0.45, 0.48, 0.47), vec3(1.03, 1.13, 0.88), vec3(0.84, 0.16, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
