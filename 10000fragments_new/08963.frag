uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.32 * pow(abs(cos(ra * 2.0 + t * 0.75)), 2.18);
    v = sin((rr - pet) * 9.85 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.37 + sin(p.y * 3.20 + t * 5.85) * 2.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.34);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.71 + time * 0.15);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
