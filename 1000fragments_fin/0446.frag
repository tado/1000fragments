uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.35 + ga * 2.0 - t * 1.56 + ph);
    v = arm * exp(-gr * 1.49);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.39 + sin(p.y * 5.05 + t * 3.45) * 2.22 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.51; q2 = rot2(0.82) * q2; }
	float d1 = fieldA(q1, (time * 0.69), 0.0);
	float d2 = fieldB(q2, (time * 0.69), 1.72);
	float d = max(d1, d2);
	vec3 col = vec3(0.991, 0.549, 0.296) * (0.08 / (abs((d)) + 0.04));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.021, 0.989, 0.963);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
