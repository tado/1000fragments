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
    vec2 tp = p * 7.10; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.10 - t * 0.75 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.94 + t * 1.32 + ph) + sin(p.y * 10.71 - t * 1.32 + ph)
        + sin((p.x + p.y) * 5.83 + t * 1.32 + ph) + sin(length(p) * 3.21 - t * 1.32 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.41 * p.y + time * 1.27); p.y += 0.36 / wf * cos(wf * 3.65 * p.x + time * 1.23); }
	p = rot2(time * 1.38) * p;
	p = rot2(2.64) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.96);
	float d = d1 + d2;
	vec3 col = palette(d * 0.86 + time * 0.00, vec3(0.48, 0.55, 0.49), vec3(0.32, 0.31, 0.40), vec3(0.99, 0.84, 1.37), vec3(0.32, 0.75, 0.75));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
