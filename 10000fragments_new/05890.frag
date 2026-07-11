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
    float ma = sin(length(p - vec2(0.26, 0.0)) * 39.06 - t * 1.53 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 37.26 - t * 7.57 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.14 + ph), vnoise2(p * 2.14 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.14 + 3.02 * wq + vec2(1.7, 9.2) + t * 0.43),
                   vnoise2(p * 2.14 + 2.79 * wq + vec2(8.3, 2.8) - t * 0.45));
    v = vnoise2(p * 2.14 + 2.87 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.58 + ph), vnoise2(p * 4.58 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.58 + 1.57 * wq + vec2(1.7, 9.2) + t * 0.39),
                   vnoise2(p * 4.58 + 3.24 * wq + vec2(8.3, 2.8) - t * 0.44));
    v = vnoise2(p * 4.58 + 3.06 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = abs(q3);
	q3.y += sin(q3.x * 3.18 + time * 3.22) * 0.32;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.27);
	float d3 = fieldC(q3, time, 1.42);
	d2 = min(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.53));
	vec3 col = hue(d * 0.56 + time * 0.15);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.60 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
