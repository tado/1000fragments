uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.28 * cos(sa * 3.0 + t * 2.58 + ph);
    v = sin((sr - petal) * 11.34);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.15 + t * 5.92 + ph) + sin(p.y * 9.07 - t * 1.36 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.19; q1 = rot2(2.52) * q1; }
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.97));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.20, 0.50), vec3(0.89, 0.94, 1.00), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
