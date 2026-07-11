uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 17.99 - t * 7.29 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 26.84 - t * 5.60 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.49 + sin(p.y * 3.07 + t * 4.54) * 1.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.57) - 0.5;
	q2 = rot2(q2.y * 1.28 + time * 0.97) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.29));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.22, 0.36), vec3(0.69, 0.97, 0.47), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
