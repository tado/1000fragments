uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.03 - t * 4.99 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.81 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.66 + t * 3.40 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.23;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.48, lr * 2.41 + (time * 0.67) * 0.84); }
	float d1 = fieldA(q1, (time * 0.67), 0.0);
	float d2 = fieldB(q2, (time * 0.67), 1.43);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.058, 0.057, 0.080), vec3(0.940, 0.881, 0.843), cc);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.926, 0.998, 1.040);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
