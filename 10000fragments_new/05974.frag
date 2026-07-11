uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.18 + sr * 6.23 - t * 3.19 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.55 - t * 1.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 1.17) * q1;
	q1 = abs(q1) - 0.74;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.93);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.40, 0.12, 0.12), vec3(0.67, 0.86, 0.43), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
