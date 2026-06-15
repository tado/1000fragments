uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.35 + t * 0.97 + ph) + sin(p.y * 14.36 - t * 4.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.48, length(p) * 5.77 - time * 0.48); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.77, lr * 2.36 + time * -0.58); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.15, vec3(0.44, 0.51, 0.51), vec3(0.49, 0.49, 0.31), vec3(1.25, 1.20, 0.88), vec3(0.80, 0.34, 0.65));
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
