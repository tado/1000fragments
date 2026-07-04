uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.97 - t * 8.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.34 * pow(abs(cos(ra * 4.0 + t * 2.78)), 1.69);
    v = sin((rr - pet) * 12.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.78) - 0.5;
	q1 *= 2.06;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.05);
	float d = d1 * d2;
	vec3 col = palette(d * 1.31 + time * 0.11, vec3(0.60, 0.44, 0.49), vec3(0.39, 0.46, 0.40), vec3(1.02, 0.83, 0.92), vec3(0.01, 0.46, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
