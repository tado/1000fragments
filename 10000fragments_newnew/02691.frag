uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.65 + ga * 4.0 - t * 1.95 + ph);
    v = arm * exp(-gr * 0.63);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.88 + t * 0.60 + ph) + sin(p.y * 5.49 - t * 1.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.56, length(q1) * 5.18 - time * 0.38); }
	q2 = rot2(2.65) * q2;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.57; q2 = rot2(0.63) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.17);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.71, 0.20, 0.47) * (0.25 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
