uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.85) - 0.5;
    float rad = 0.36 + 0.12 * sin(t * 2.92 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.90 + sr * 16.06 - t * 0.84 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.79 + sin(p.y * 2.98 + t * 2.14) * 3.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.53, length(q1) * 4.29 - time * 0.96); }
	q1 = abs(q1) - 0.62;
	q2 = fract(q2 * 2.46) - 0.5;
	q2 = (floor(q2 * 24.3) + 0.5) / 24.3;
	q3 = fract(q3 * 1.17) - 0.5;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d3 = fieldC(q3, time, 0.66);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.41));
	vec3 col = palette(d * 0.98 + time * 0.02, vec3(0.52, 0.49, 0.41), vec3(0.47, 0.49, 0.36), vec3(0.85, 0.84, 1.17), vec3(0.76, 0.22, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
