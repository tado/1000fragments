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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.91 + ph), vnoise2(p * 4.91 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.91 + 3.73 * wq + vec2(1.7, 9.2) + t * 0.50),
                   vnoise2(p * 4.91 + 1.31 * wq + vec2(8.3, 2.8) - t * 0.89));
    v = vnoise2(p * 4.91 + 1.19 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.21; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 20.13 - t * 1.87 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.14 + t * 0.38) - 0.5) * 2.0;
    v = sin((p.y * 4.94 + zx * 1.79 + t * 1.83) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.30 * fr * fr; }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.77; }
	{ float fr = length(q2); q2 *= 1.0 + 0.29 * fr * fr; }
	q3 *= 1.53;
	float d1 = fieldA(q1, (time * 0.74), 0.0);
	float d2 = fieldB(q2, (time * 0.74), 1.86);
	float d3 = fieldC(q3, (time * 0.74), 0.38);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.74) * 1.31));
	vec3 col = vec3(0.50, 0.53, 0.44) * (0.09 / (abs((d)) + 0.09));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 1.015, 0.992) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
