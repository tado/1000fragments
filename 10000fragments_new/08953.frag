uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.35 + sr * 10.06 - t * 1.17 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.78 + sin(p.y * 2.56 + t * 0.90) * 4.51 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.57 + 0.23 * sin(t * 0.47)) + vec2(-0.81, -0.16) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 22; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 22.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 *= 1.92;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.62);
	float d3 = fieldC(q3, time, 1.18);
	d2 = abs(d2 - d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.64));
	vec3 col = vec3(0.28, 1.00, 0.66) * (0.13 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.86 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
