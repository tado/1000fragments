uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.30 * cos(sa * 8.0 + t * 2.39 + ph);
    v = sin((sr - petal) * 15.51);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.74 + t * 1.85 + ph) * 0.7;
    float wb = sin(p.y * 6.25 - t * 3.49 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.37;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.35; q2 = rot2(2.30) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d = max(d1, d2);
	vec3 col = vec3(0.88, 0.37, 0.59) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.84 + 0.16 * sin(gl_FragCoord.y * 2.75 + time * 6.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
