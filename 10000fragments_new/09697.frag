uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.36 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.93 + t * 2.97 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.94) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 1.64 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.01 + sin(p.y * 3.66 + t * 4.36) * 2.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.66;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.89, length(q1) * 2.94 - time * 0.44); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d3 = fieldC(q3, time, 1.66);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.30 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
