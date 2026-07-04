uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.76 - t * 1.11;
    v = sin(floor(lv * 5.6) / 5.6 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.38 + sin(p.y * 3.22 + t * 0.61) * 2.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	vec2 q1 = p; vec2 q2 = p;
	q2.y += sin(q2.x * 5.35 + time * 3.14) * 0.19;
	{ float fr = length(q2); q2 *= 1.0 + -0.75 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d = min(d1, d2);
	vec3 col = vec3(0.63, 0.72, 0.30) * (0.22 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.55, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
