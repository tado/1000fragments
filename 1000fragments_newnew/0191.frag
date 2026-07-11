uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.89 + t * 0.48) - 0.5) * 2.0;
    v = sin((p.y * 3.25 + zx * 1.10 + t * 0.90) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.99 + sr * 15.36 - t * 4.65 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.12;
    v = 0.5 * (sin(6.0 * cp.x + t * 1.77) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 0.77) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.29) - 0.5;
	q2 = abs(q2) - 0.55;
	q2 = rot2(0.98) * q2;
	q3 = abs(q3) - 0.36;
	q3 = rot2((time * 0.53) * 0.57) * q3;
	float d1 = fieldA(q1, (time * 0.53), 0.0);
	float d2 = fieldB(q2, (time * 0.53), 1.84);
	float d3 = fieldC(q3, (time * 0.53), 0.64);
	d2 = d2 * d3;
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.10, 0.16), vec3(0.71, 0.76, 0.68), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.933, 0.972, 1.036) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
