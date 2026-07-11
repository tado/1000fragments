uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.80) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.47 + 0.19 * pow(abs(cos(ra * 6.0 + t * 2.63)), 1.93);
    v = sin((rr - pet) * 12.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.88) * q1;
	q2.x += sin(q2.y * 3.21 + (time * 0.54) * 3.05) * 0.16;
	float d1 = fieldA(q1, (time * 0.54), 0.0);
	float d2 = fieldB(q2, (time * 0.54), 0.08);
	float d = abs(d1 - d2);
	vec3 col = palette((d) * 0.74 + (time * 0.54) * 0.07, vec3(0.31, 0.31, 0.37), vec3(0.25, 0.23, 0.22), vec3(0.80, 0.61, 0.71), vec3(0.92, 0.33, 0.34));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.86 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.968, 1.009) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
