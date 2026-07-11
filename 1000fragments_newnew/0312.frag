uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.31 - t * 7.71 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.07 + vec2(t * 0.39, -t * 0.89);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.65, 0.97) * sin(length(q1) * 3.21 - (time * 0.78) * 1.27) * 0.33;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.33; q2 = rot2(0.94) * q2; }
	float d1 = fieldA(q1, (time * 0.78), 0.0);
	float d2 = fieldB(q2, (time * 0.78), 0.60);
	float d = min(d1, d2);
	vec3 col = vec3(0.40, 0.51, 0.46) * (0.07 / (abs((d)) + 0.07));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.36 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.967, 1.014) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
