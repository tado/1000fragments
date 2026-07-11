uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.22 * pow(abs(cos(ra * 6.0 + t * 0.97)), 1.92);
    v = sin((rr - pet) * 23.49 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 28.90 - t * 1.41 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 25.22 - t * 1.84 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.55, length(q1) * 4.02 - time * 0.54); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.63);
	float d = d1 * d2;
	vec3 col = palette(d * 0.56 + time * 0.39, vec3(0.56, 0.55, 0.44), vec3(0.39, 0.43, 0.46), vec3(1.04, 1.22, 1.02), vec3(0.52, 0.29, 0.22));
	col = clamp((col - 0.5) * 1.87 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
