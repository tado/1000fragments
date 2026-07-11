uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.66 + vec2(t * 0.74, -t * 0.55);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.13 + vec2(t * 0.22, -t * 1.48);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.81 + 0.38 * sin(t * 1.42)) + vec2(-0.31, 0.03) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 31; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 31.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	p.y = abs(p.y) - 0.40;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.98, 0.39) * sin(length(q1) * 5.29 - (time * 0.81) * 1.74) * 0.11;
	q1 = rot2(q1.y * -1.94 + (time * 0.81) * 0.30) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.21, lr * 2.52 + (time * 0.81) * 0.27); }
	q2 = sin(q2 * 2.55 + (time * 0.81) * 2.12) * 1.00;
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 0.98;
	q3 *= 1.82;
	float d1 = fieldA(q1, (time * 0.81), 0.0);
	float d2 = fieldB(q2, (time * 0.81), 0.50);
	float d3 = fieldC(q3, (time * 0.81), 1.66);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = vec3(0.67, 0.64, 0.62) * (0.10 / (abs((d)) + 0.05));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 1.005, 1.014) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
