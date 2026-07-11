uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.56 + 0.16 * pow(abs(cos(ra * 2.0 + t * 2.02)), 0.90);
    v = sin((rr - pet) * 10.93 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.29 + t * 1.93 + ph) * 0.7;
    float wb = sin(p.y * 19.29 - t * 0.86 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.76;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(-0.46, 0.20) * sin(length(q2) * 2.02 - time * 1.93) * 0.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.40);
	float d = d1 * d2;
	vec3 col = palette(d * 1.42 + time * 0.22, vec3(0.58, 0.48, 0.56), vec3(0.32, 0.47, 0.31), vec3(1.22, 1.12, 1.17), vec3(0.73, 0.69, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
