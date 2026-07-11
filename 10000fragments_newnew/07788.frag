uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.79 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.99 + t * 1.98 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.89 + t * 4.56 + ph) + sin(p.y * 7.81 - t * 4.56 + ph)
        + sin((p.x + p.y) * 10.04 + t * 4.56 + ph) + sin(length(p) * 10.52 - t * 4.56 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.00 * sin(mf + 3.0) + ph), cos(t * 1.48 * cos(mf + 3.0) + ph));
        ms += 0.055 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.85;
	{ float fr = length(q2); q2 *= 1.0 + -0.24 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.04);
	float d3 = fieldC(q3, time, 1.19);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.61 + time * 0.93);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
