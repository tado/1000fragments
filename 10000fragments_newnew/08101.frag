uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.85 + t * 3.77 + ph) + sin(p.y * 4.68 - t * 3.77 + ph)
        + sin((p.x + p.y) * 8.60 + t * 3.77 + ph) + sin(length(p) * 14.27 - t * 3.77 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.60 + 0.20 * pow(abs(cos(ra * 4.0 + t * 1.55)), 1.66);
    v = sin((rr - pet) * 21.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.83) - 0.5;
	q2 = (floor(q2 * 24.8) + 0.5) / 24.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.29);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.95, 0.46, 0.31) * (0.23 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
