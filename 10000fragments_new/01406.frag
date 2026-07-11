uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.46 + 0.22 * pow(abs(cos(ra * 2.0 + t * 0.52)), 0.52);
    v = sin((rr - pet) * 23.91 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.19 + t * 1.08 + ph) * 0.7;
    float wb = sin(p.y * 13.07 - t * 2.49 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.31;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.19, 0.29), vec3(0.59, 0.85, 0.83), cc);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 2.44 + time * 7.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
