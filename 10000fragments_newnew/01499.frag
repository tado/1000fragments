uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.16 + t * 1.28 + ph) + sin(p.y * 8.19 - t * 3.92 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.63, lr * 2.05 + time * 0.44); }
	p += vec2(0.84, 0.22) * sin(length(p) * 3.79 - time * 1.22) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.02, vec3(0.59, 0.58, 0.40), vec3(0.48, 0.38, 0.48), vec3(0.87, 1.22, 1.34), vec3(0.25, 0.11, 0.15));
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 0.97 + time * 11.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
