uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.45 + t * 0.94 + ph) + sin(p.y * 2.45 - t * 0.94 + ph)
        + sin((p.x + p.y) * 2.04 + t * 0.94 + ph) + sin(length(p) * 3.73 - t * 0.94 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.96, t * 0.97 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.61;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.25, lr * 2.17 + time * -0.74); }
	p += vec2(-0.54, 0.10) * sin(length(p) * 5.64 - time * 1.22) * 0.17;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.11 + time * 0.26, vec3(0.45, 0.55, 0.60), vec3(0.31, 0.37, 0.39), vec3(1.27, 0.94, 1.18), vec3(0.52, 0.55, 0.35));
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
