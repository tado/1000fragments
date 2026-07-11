uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.24 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.31 + t * 2.34 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.90 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.86 + t * 2.05 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.56) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.03));
	vec3 col = palette(d * 1.28 + time * 0.08, vec3(0.44, 0.42, 0.58), vec3(0.50, 0.44, 0.32), vec3(1.21, 0.74, 0.78), vec3(0.69, 0.19, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
