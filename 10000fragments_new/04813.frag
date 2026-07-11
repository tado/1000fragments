uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 23.01 - t * 3.97 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 33.53 - t * 1.68 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.18 + sin(p.y * 2.05 + t * 5.96) * 3.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.71) * q1;
	q1 = rot2(q1.y * -3.07 + time * 0.42) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.66);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.25, 0.14), vec3(0.80, 0.99, 0.49), cc);
	col = fract(col * 1.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
