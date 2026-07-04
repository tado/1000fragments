uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.49 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.21 + t * 3.68 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.53 + t * 2.88 + ph) * 0.7;
    float wb = sin(p.y * 11.30 - t * 2.72 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.28;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.62 - t * 4.01 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.41, lr * 1.01 + time * -0.76); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.89));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.38);
	float d3 = fieldC(q3, time, 1.82);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.47 + time * 0.16);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
