uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.94) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.48 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 3.0 + qr * 6.64 * sin(t * 0.91) + t * 4.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.42, lr * 1.56 + (time * 0.78) * 0.90); }
	q1 = sin(q1 * 1.36 + (time * 0.78) * 1.69) * 0.78;
	q2 = rot2(q2.y * 1.15 + (time * 0.78) * 0.75) * q2;
	float d1 = fieldA(q1, (time * 0.78), 0.0);
	float d2 = fieldB(q2, (time * 0.78), 0.77);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.09, 0.10), vec3(0.48, 0.57, 0.58), smoothstep(0.0, 1.0, cc));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.19 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.911, 0.991, 1.028) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
