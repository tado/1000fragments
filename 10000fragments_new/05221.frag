uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.31) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.48 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.24 + t * 1.83 + ph) + sin(p.y * 6.78 - t * 4.47 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.85 + vec2(t * 0.33, -t * 1.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.43, lr * 2.62 + time * 0.99); }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.55);
	float d3 = fieldC(q3, time, 1.07);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.21 + time * 0.33);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.35 + time * 15.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
