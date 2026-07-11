uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 23.62 - t * 4.90 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 15.72 - t * 3.78 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 32.49 - t * 7.15 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 17.40 - t * 7.84 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.49;
	q2 = rot2(time * -1.26) * q2;
	q2 *= 2.67;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.93);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.10));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.29, 0.29), vec3(0.89, 0.98, 0.74), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
