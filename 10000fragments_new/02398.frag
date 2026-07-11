uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.33 + sin(p.y * 1.35 + t * 1.61) * 1.30 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.14 + sin(p.y * 3.93 + t * 1.08) * 3.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(1.54) * q2;
	q2 = rot2(length(q2) * 3.51 + time * 1.17) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.05);
	float d = d1 * d2;
	vec3 col = vec3(0.67, 0.30, 0.59) * (0.12 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 1.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
