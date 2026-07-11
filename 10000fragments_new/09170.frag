uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.28 * pow(abs(cos(ra * 4.0 + t * 2.54)), 1.28);
    v = sin((rr - pet) * 20.46 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.51 + t * 0.54 + ph) + sin(p.y * 9.27 - t * 0.54 + ph)
        + sin((p.x + p.y) * 7.06 + t * 0.54 + ph) + sin(length(p) * 12.06 - t * 0.54 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 11.67 - t * 1.70 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 27.26 - t * 4.68 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 2.80) - 0.5;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.74, length(q2) * 2.60 - time * 0.74); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.44);
	float d3 = fieldC(q3, time, 0.55);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.28, vec3(0.52, 0.43, 0.54), vec3(0.41, 0.39, 0.40), vec3(0.91, 1.37, 0.94), vec3(0.21, 0.20, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
