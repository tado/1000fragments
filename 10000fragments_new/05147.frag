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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.36; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 19.51 - t * 2.75 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.47 + ph), vnoise2(p * 4.47 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.47 + 3.13 * wq + vec2(1.7, 9.2) + t * 0.33),
                   vnoise2(p * 4.47 + 1.90 * wq + vec2(8.3, 2.8) - t * 0.38));
    v = vnoise2(p * 4.47 + 3.28 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.50 + t * 4.74 + ph) + sin(p.y * 4.09 - t * 1.93 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 1.59 + time * 1.14) * q1;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.70, length(q1) * 5.68 - time * 0.51); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.10);
	float d3 = fieldC(q3, time, 1.72);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = hue(d * 1.08 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
