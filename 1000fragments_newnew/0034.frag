uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.14 * jf)) * 0.91;
        xs += sin(length(p - im) * 117.29 - t * 6.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.65 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.44 + t * 3.58 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.27; q1 = rot2(2.39) * q1; }
	{ float fr = length(q1); q1 *= 1.0 + 0.29 * fr * fr; }
	q2 += vec2(0.58, -0.48) * sin(length(q2) * 2.62 - (time * 0.57) * 0.92) * 0.22;
	float d1 = fieldA(q1, (time * 0.57), 0.0);
	float d2 = fieldB(q2, (time * 0.57), 0.95);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.52, 0.40, 0.42) * (0.06 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 0.967, 1.029) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
