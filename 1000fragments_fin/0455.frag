uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.39 + t * 3.61 + ph) + sin(p.y * 6.53 - t * 5.45 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.36 + vec2(t * 0.64, -t * 1.19);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.38;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.65;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.83) * 0.65));
	float d1 = fieldA(q1, (time * 0.83), 0.0);
	float d2 = fieldB(q2, (time * 0.83), 1.37);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.889, 0.257, 0.213) * (0.13 / (abs((d)) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.023, 0.959, 1.000);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
