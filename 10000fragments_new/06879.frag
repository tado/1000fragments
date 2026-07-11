uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.13 + 0.14 * sin(t * 0.50)) + vec2(-0.48, 0.13) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 27; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 27.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.28 * cos(sa * 4.0 + t * 0.86 + ph);
    v = sin((sr - petal) * 13.89);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.08 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.65 + t * 2.81 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.70 * fr * fr; }
	q3 = (floor(q3 * 13.3) + 0.5) / 13.3;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.41 / wf * sin(wf * 2.45 * q3.y + time * 1.90); q3.y += 0.25 / wf * cos(wf * 2.97 * q3.x + time * 1.75); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.18);
	float d3 = fieldC(q3, time, 0.97);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 0.73 + time * 0.00);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
