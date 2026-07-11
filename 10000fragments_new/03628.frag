uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.31 + vec2(t * 2.54, -t * 1.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.70;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.03 - t * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.30, lr * 1.65 + time * 0.48); }
	p += vec2(-0.33, -0.30) * sin(length(p) * 2.75 - time * 1.98) * 0.34;
	p = abs(p) - 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.06 + time * 0.16, vec3(0.46, 0.44, 0.54), vec3(0.34, 0.36, 0.49), vec3(1.16, 1.12, 0.74), vec3(0.82, 0.37, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
