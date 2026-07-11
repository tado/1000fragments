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
    v = 0.5 * sin(length(p) * 33.41 - t * 8.35 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.89; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 28.53 - t * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	{ p = vec2(atan(p.y, p.x) * 2.99, length(p) * 4.44 - time * 0.27); }
	p = rot2(length(p) * 1.32 + time * 1.11) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.64 * p.y + time * 0.82); p.y += 0.33 / wf * cos(wf * 2.89 * p.x + time * 0.85); }
	p += vec2(0.71, -0.19) * sin(length(p) * 3.10 - time * 1.33) * 0.14;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.54);
	float d = d1 * d2;
	vec3 col = palette(d * 1.75 + time * 0.06, vec3(0.49, 0.55, 0.43), vec3(0.46, 0.32, 0.39), vec3(0.89, 0.74, 1.17), vec3(0.89, 0.42, 0.57));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
