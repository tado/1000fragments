uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 21.63 - t * 3.42 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 30.23 - t * 1.33 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.45 + jf * 4.0), cos(t * 0.25 * jf)) * 0.79;
        xs += sin(length(p - im) * 75.28 - t * 12.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.03 + vec2(t * 0.64, -t * 1.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.33; q1 = rot2(2.21) * q1; }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.19, lr * 1.19 + time * 0.22); }
	q2 = rot2(2.71) * q2;
	q2 *= 1.0 + 0.30 * sin(time * 1.89);
	q3 = rot2(q3.y * -1.08 + time * 0.97) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.63);
	float d3 = fieldC(q3, time, 0.80);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.72 + time * 0.28, vec3(0.52, 0.45, 0.59), vec3(0.50, 0.43, 0.48), vec3(0.95, 1.08, 1.04), vec3(0.69, 0.26, 0.67));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.71 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
