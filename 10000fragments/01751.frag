uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.51 + t * 2.33 + ph) + sin(p.y * 11.58 - t * 2.33 + ph)
        + sin((p.x + p.y) * 8.22 + t * 2.33 + ph) + sin(length(p) * 9.84 - t * 2.33 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.52 + vec2(t * 2.46, -t * 2.46) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 2.85 - time * 0.53); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 1.38 + time * -0.61); }
	p = fract(p * 1.91) - 0.5;
	p *= 2.47;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.04);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.47 + time * 0.11, vec3(0.49, 0.52, 0.47), vec3(0.47, 0.47, 0.46), vec3(1.29, 1.06, 1.31), vec3(0.65, 0.29, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
