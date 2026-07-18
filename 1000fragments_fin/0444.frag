uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 33.02 - t * 7.16 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 12.33 - t * 6.11 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.31 + 0.23 * pow(abs(cos(ra * 4.0 + t * 1.33)), 2.19);
    v = sin((rr - pet) * 18.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p = p.yx;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 3.48 + (time * 0.56) * 1.73) * 0.11;
	q1 = (floor(q1 * 15.1) + 0.5) / 15.1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 *= 2.88;
	float d1 = fieldA(q1, (time * 0.56), 0.0);
	float d2 = fieldB(q2, (time * 0.56), 1.04);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.56) * 1.51));
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.047, 0.099, 0.030), vec3(0.376, 0.461, 0.222), smoothstep(0.0, 0.52, cc)), vec3(0.975, 0.907, 0.526), smoothstep(0.52, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.987, 1.017, 0.948);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
