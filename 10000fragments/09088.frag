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
    vec2 wq = vec2(vnoise2(p * 1.68 + ph), vnoise2(p * 1.68 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.68 + 2.18 * wq + vec2(1.7, 9.2) + t * 0.73),
                   vnoise2(p * 1.68 + 2.13 * wq + vec2(8.3, 2.8) - t * 0.79));
    v = vnoise2(p * 1.68 + 1.07 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 3.08, t * 0.75)) - 0.5) * 0.77;
    v = exp(-abs(bx) * 9.94) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.96;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.48;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.24));
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 2.49));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.80);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.58, 0.60, 0.63) * (0.07 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
