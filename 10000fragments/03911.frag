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
    v = 0.25 * (sin(p.x * 4.47 + t * 3.06 + ph) + sin(p.y * 2.29 - t * 3.06 + ph)
        + sin((p.x + p.y) * 10.27 + t * 3.06 + ph) + sin(length(p) * 12.80 - t * 3.06 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.35; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.92 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.24 * p.y + time * 1.66); p.y += 0.29 / wf * cos(wf * 1.55 * p.x + time * 0.72); }
	{ p = vec2(atan(p.y, p.x) * 1.34, length(p) * 3.21 - time * 0.59); }
	p = rot2(2.11) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.96);
	float d = d1 + d2;
	vec3 col = palette(d * 1.61 + time * 0.28, vec3(0.57, 0.48, 0.44), vec3(0.48, 0.33, 0.39), vec3(0.99, 0.92, 0.93), vec3(0.83, 0.97, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
