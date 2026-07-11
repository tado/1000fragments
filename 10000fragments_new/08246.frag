uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 8.93 - t * 3.44 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 15.81 - t * 5.04 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.94 + vec2(t * 2.46, -t * 0.41) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.19, -0.54) * sin(length(q1) * 5.82 - time * 1.22) * 0.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.44);
	float d = d1 * d2;
	vec3 col = palette(d * 1.36 + time * 0.36, vec3(0.49, 0.46, 0.49), vec3(0.34, 0.46, 0.31), vec3(1.29, 1.24, 0.95), vec3(0.17, 0.36, 0.48));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.29 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
