uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.32 + t * 3.12 + ph) + sin(p.y * 3.19 - t * 3.12 + ph)
        + sin((p.x + p.y) * 9.23 + t * 3.12 + ph) + sin(length(p) * 6.69 - t * 3.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 1.81 + time * 0.21); }
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.31 + time * 0.19);
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
