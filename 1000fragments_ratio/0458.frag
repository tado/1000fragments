uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.12;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 12.52 - t * 4.67 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.28 + ga * 2.0 - t * 2.36 + ph);
    v = arm * exp(-gr * 1.18);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.79;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.13) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 2.73) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(-0.64, -0.46) * sin(length(q1) * 4.17 - (time * 0.72) * 1.03) * 0.34;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.75;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.96, length(q2) * 3.96 - (time * 0.72) * 0.41); }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.48; }
	float d1 = fieldA(q1, (time * 0.72), 0.0);
	float d2 = fieldB(q2, (time * 0.72), 0.20);
	float d3 = fieldC(q3, (time * 0.72), 1.76);
	d2 = min(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.72) * 0.70));
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.49, 0.42, 0.49) + vec3(0.04, 0.03, 0.00);
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 1.48 + (time * 0.72) * 15.71);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.992, 0.985) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
