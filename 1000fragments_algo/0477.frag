uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.02) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 3.31 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.36 + sin(p.y * 1.92 + t * 0.52) * 3.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin((time * 0.80) * 1.66));
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.23, lr * 2.71 + (time * 0.80) * 0.64); }
	float d1 = fieldA(q1, (time * 0.80), 0.0);
	float d2 = fieldB(q2, (time * 0.80), 1.26);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.80) * 1.37));
	vec3 col = vec3(0.60, 0.56, 0.63) * (0.09 / (abs((d)) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 0.995, 0.955) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
