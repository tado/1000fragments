uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.39 + vec2(t * 2.03, -t * 0.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.36, 0.0)) * 36.63 - t * 2.36 + ph);
    float mb = sin(length(p + vec2(0.36, 0.0)) * 29.47 - t * 1.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.05, 0.01) * sin(length(q1) * 5.86 - time * 2.05) * 0.38;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.52; q1 = rot2(1.79) * q1; }
	q2 = rot2(1.23) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.51 + time * 0.62);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.14 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
