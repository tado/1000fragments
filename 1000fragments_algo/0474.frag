uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.32;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 2.36 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.61 + 0.27 * cos(sa * 9.0 + t * 2.58 + ph);
    v = sin((sr - petal) * 9.84);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.20;
	p *= 1.72;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.99 + (time * 0.78) * 0.84) * q1;
	q1 = fract(q1 * 1.94) - 0.5;
	q2 = fract(q2 * 2.59) - 0.5;
	q2.y += sin(q2.x * 5.05 + (time * 0.78) * 3.63) * 0.19;
	float d1 = fieldA(q1, (time * 0.78), 0.0);
	float d2 = fieldB(q2, (time * 0.78), 0.16);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.03, 0.00), vec3(0.65, 0.64, 0.69), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.977, 1.043) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
