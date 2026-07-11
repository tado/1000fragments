uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.26 * cos(sa * 5.0 + t * 1.54 + ph);
    v = sin((sr - petal) * 11.94);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.12 + sin(p.y * 4.04 + t * 5.02) * 2.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.55) - 0.5;
	q2 *= 1.23;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.47);
	float d = d1 * d2;
	vec3 col = vec3(0.69, 0.75, 0.24) * (0.23 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
