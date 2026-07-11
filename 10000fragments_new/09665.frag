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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.58 + 0.32 * pow(abs(cos(ra * 7.0 + t * 2.79)), 0.87);
    v = sin((rr - pet) * 14.58 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.10 + ph), vnoise2(p * 3.10 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.10 + 2.36 * wq + vec2(1.7, 9.2) + t * 0.87),
                   vnoise2(p * 3.10 + 3.97 * wq + vec2(8.3, 2.8) - t * 1.16));
    v = vnoise2(p * 3.10 + 3.32 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.77 + vec2(t * 2.62, -t * 0.95) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.75 * fr * fr; }
	q1 = (floor(q1 * 28.3) + 0.5) / 28.3;
	{ float fr = length(q2); q2 *= 1.0 + 0.59 * fr * fr; }
	{ q3 = vec2(atan(q3.y, q3.x) * 1.60, length(q3) * 2.68 - time * 0.86); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.74);
	float d3 = fieldC(q3, time, 0.44);
	d2 = min(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.53));
	vec3 col = hue(d * 1.13 + time * 0.03);
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
