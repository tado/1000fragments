uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.54 + 0.26 * pow(abs(cos(ra * 2.0 + t * 1.59)), 0.58);
    v = sin((rr - pet) * 21.66 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 2.86 * sin(t * 1.05) + t * 3.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.26) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.26);
	float d = d1 * d2;
	vec3 col = palette(d * 1.38 + time * 0.03, vec3(0.58, 0.58, 0.55), vec3(0.48, 0.35, 0.49), vec3(1.25, 0.78, 1.12), vec3(0.19, 0.77, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
