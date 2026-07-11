uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.57 - t * 3.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 29.06 - t * 2.74 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 28.96 - t * 4.54 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * -2.92 + time * 0.62) * q2;
	q2 = fract(q2 * 1.66) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.04);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.29, 0.46), vec3(0.81, 0.71, 0.59), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
