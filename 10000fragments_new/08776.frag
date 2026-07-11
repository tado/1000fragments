uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.32 + sr * 11.19 - t * 4.64 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 3.16 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.01); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.95; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.83 - t * 1.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 += vec2(0.39, -0.90) * sin(length(q2) * 2.96 - time * 1.96) * 0.31;
	q3 = rot2(q3.y * -3.35 + time * 0.72) * q3;
	q3 = (floor(q3 * 22.1) + 0.5) / 22.1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d3 = fieldC(q3, time, 1.70);
	d2 = max(d2, d3);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.23, 0.25), vec3(0.81, 0.82, 0.68), cc);
	col = mod(col * 1.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
