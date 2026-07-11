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
    vec2 cq = p * 11.80 + vec2(t * 2.38, -t * 1.39) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.77 + ph), vnoise2(p * 4.77 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.77 + 2.92 * wq + vec2(1.7, 9.2) + t * 0.34),
                   vnoise2(p * 4.77 + 2.46 * wq + vec2(8.3, 2.8) - t * 0.41));
    v = vnoise2(p * 4.77 + 2.67 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.53 + sin(p.y * 4.41 + t * 1.54) * 4.22 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.57;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1);
	q1 = (floor(q1 * 16.6) + 0.5) / 16.6;
	{ float fr = length(q2); q2 *= 1.0 + -0.67 * fr * fr; }
	q2 = rot2(length(q2) * -2.12 + time * 0.76) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.03);
	float d3 = fieldC(q3, time, 1.30);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.24, 0.70, 0.38) * (0.10 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
