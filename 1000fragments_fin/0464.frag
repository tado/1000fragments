uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.34;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.24 - t * 3.54 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.19, t * 1.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.80) * 0.36), cos((time * 0.80) * 0.78)) * 0.05;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.71, length(q1) * 5.39 - (time * 0.80) * 0.36); }
	q1 = fract(q1 * 2.70) - 0.5;
	q2 = (floor(q2 * 21.1) + 0.5) / 21.1;
	float d1 = fieldA(q1, (time * 0.80), 0.0);
	float d2 = fieldB(q2, (time * 0.80), 0.29);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.80) * 0.61));
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.044, 0.046, 0.108), vec3(0.772, 0.713, 0.949), cc);
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.043, 0.993, 0.935);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
