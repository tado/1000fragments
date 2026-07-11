uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.49 + t * 2.58 + ph) + sin(p.y * 2.64 - t * 2.58 + ph)
        + sin((p.x + p.y) * 2.28 + t * 2.58 + ph) + sin(length(p) * 5.44 - t * 2.58 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.47 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.22 + t * 3.07 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.58;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(2.59) * q1;
	q1.y += sin(q1.x * 6.37 + time * 3.46) * 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d = d1 * d2;
	vec3 col = palette(d * 1.13 + time * 0.21, vec3(0.46, 0.54, 0.51), vec3(0.43, 0.39, 0.39), vec3(1.16, 1.00, 0.78), vec3(0.61, 0.24, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
