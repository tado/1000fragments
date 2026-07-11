uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.81) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.73 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.78 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.08 + t * 2.21 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 7.8) + 0.5) / 7.8;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.38; q2 = rot2(0.71) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.09 + time * 0.28);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
