uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 33.36 - t * 2.67 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 9.35 - t * 3.46 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.18 * pow(abs(cos(ra * 6.0 + t * 0.99)), 1.71);
    v = sin((rr - pet) * 11.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 2.04;
	q1 = abs(q1);
	q2 = fract(q2 * 1.63) - 0.5;
	q2 = rot2(length(q2) * 1.34 + time * 0.94) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.76);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.38, 0.12), vec3(0.93, 0.66, 0.91), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
