uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.83 + t * 0.78 + ph) + sin(p.y * 4.27 - t * 0.78 + ph)
        + sin((p.x + p.y) * 4.95 + t * 0.78 + ph) + sin(length(p) * 12.71 - t * 0.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.11, lr * 1.49 + time * -0.26); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.04, vec3(0.45, 0.44, 0.58), vec3(0.38, 0.30, 0.42), vec3(1.24, 1.06, 1.30), vec3(0.16, 0.65, 0.81));
	col = mod(col * 1.76, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
