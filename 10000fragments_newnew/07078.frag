uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.20 + t * 2.10 + ph) + sin(p.y * 11.27 - t * 2.10 + ph)
        + sin((p.x + p.y) * 7.99 + t * 2.10 + ph) + sin(length(p) * 11.31 - t * 2.10 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.41 + 0.19 * pow(abs(cos(ra * 4.0 + t * 0.71)), 1.81);
    v = sin((rr - pet) * 9.80 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.31 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.22));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.12, 0.70, 0.83) + vec3(0.03, 0.09, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
