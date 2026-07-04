uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.13 + vec2(t * 1.37, -t * 1.44) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 9.28 - t * 5.33 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 25.41 - t * 5.46 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.70) * q1;
	q1 = sin(q1 * 1.21 + time * 1.20) * 0.64;
	q2 = rot2(length(q2) * -1.78 + time * 1.04) * q2;
	q2 *= 2.65;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.81);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.48));
	vec3 col = palette(d * 1.15 + time * 0.36, vec3(0.51, 0.51, 0.48), vec3(0.46, 0.37, 0.48), vec3(0.72, 1.06, 0.83), vec3(0.40, 0.75, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
