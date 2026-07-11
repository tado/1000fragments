uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.97 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.79 + t * 1.45 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 21.31);
    float gsh = hash21(vec2(grow, floor(t * 6.10))) - 0.5;
    float gx = p.x + gsh * 0.77;
    v = sin(gx * 6.02 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.28));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = d1 * d2;
	vec3 col = vec3(0.37, 0.46, 0.17) * (0.19 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 1.97 + time * 15.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
