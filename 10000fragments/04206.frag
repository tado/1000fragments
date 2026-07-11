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
    vec2 tp = p * 3.07; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 16.42 - t * 3.40 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.89 + t * 2.31 + ph) + sin(p.y * 2.14 - t * 2.31 + ph)
        + sin((p.x + p.y) * 6.27 + t * 2.31 + ph) + sin(length(p) * 12.14 - t * 2.31 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.29 * p.y + time * 1.23); p.y += 0.48 / wf * cos(wf * 1.94 * p.x + time * 0.84); }
	p = rot2(time * -0.35) * p;
	p = fract(p * 1.09) - 0.5;
	p = abs(p) - 0.61;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = d1 + d2;
	vec3 col = palette(d * 1.64 + time * 0.02, vec3(0.47, 0.45, 0.43), vec3(0.37, 0.42, 0.42), vec3(1.38, 1.22, 1.13), vec3(0.43, 0.48, 0.15));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
