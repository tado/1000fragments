uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.06 + t * 3.88 + ph) + sin(p.y * 15.97 - t * 0.69 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.31, lr * 1.38 + time * 0.21); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.09, vec3(0.44, 0.47, 0.41), vec3(0.42, 0.44, 0.31), vec3(1.11, 1.09, 1.22), vec3(0.77, 0.56, 0.79));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
