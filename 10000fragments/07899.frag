uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.86 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.37 + t * 1.59 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.27; vec2 jc = vec2(0.32 + 0.3 * sin(t * 1.00 + ph), -0.24 + 0.3 * cos(t * 1.13 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 23; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 23.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.48 + t * 1.64 + ph) * 0.7;
    float wb = sin(p.y * 14.57 - t * 0.64 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.27;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.88; }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = abs(q2);
	q3 *= 2.70;
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 2.31));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.66);
	float d3 = fieldC(q3, time, 1.10);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.20));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.04, 0.16), vec3(0.58, 0.76, 0.89), cc);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
