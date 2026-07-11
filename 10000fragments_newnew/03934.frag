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
    float grow = floor(p.y * 11.15);
    float gsh = hash21(vec2(grow, floor(t * 3.09))) - 0.5;
    float gx = p.x + gsh * 0.67;
    v = sin(gx * 10.95 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.37));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.76 + vec2(t * 1.38, -t * 2.95) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.26 * vnoise2(p * 5.13 + t * 1.30);
    v = sin(wr * 20.00 - t * 1.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.18) - 0.5;
	q2 += vec2(-0.72, 0.70) * sin(length(q2) * 4.82 - time * 1.37) * 0.10;
	q3 = rot2(0.47) * q3;
	q3 = (floor(q3 * 21.6) + 0.5) / 21.6;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.09);
	float d3 = fieldC(q3, time, 0.55);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.23, 0.47), vec3(0.67, 0.80, 0.90), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
