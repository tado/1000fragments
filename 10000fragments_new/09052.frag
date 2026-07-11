uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.04; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 22.54 - t * 1.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.76 + ph), vnoise2(p * 3.76 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.76 + 1.25 * wq + vec2(1.7, 9.2) + t * 1.11),
                   vnoise2(p * 3.76 + 2.55 * wq + vec2(8.3, 2.8) - t * 0.89));
    v = vnoise2(p * 3.76 + 3.46 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.66 + 0.16 * cos(sa * 5.0 + t * 2.09 + ph);
    v = sin((sr - petal) * 14.67);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.11, 0.65) * sin(length(q1) * 2.46 - time * 2.26) * 0.22;
	q1 *= 1.21;
	q2.x += sin(q2.y * 4.31 + time * 2.68) * 0.14;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.39);
	float d3 = fieldC(q3, time, 0.66);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.30 + time * 0.11, vec3(0.57, 0.59, 0.49), vec3(0.32, 0.47, 0.44), vec3(0.84, 0.95, 0.77), vec3(0.56, 0.64, 0.83));
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 2.75 + time * 4.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
