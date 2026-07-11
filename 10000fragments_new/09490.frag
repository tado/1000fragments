uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.95 + vec2(t * 1.67, -t * 2.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.55 + sr * 13.81 - t * 4.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 3.35 + time * 0.49) * q1;
	q2 = rot2(2.65) * q2;
	q2 += vec2(-0.20, -0.64) * sin(length(q2) * 2.25 - time * 1.29) * 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.29);
	float d = max(d1, d2);
	vec3 col = vec3(0.89, 0.26, 0.27) * (0.20 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
