uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.04 + sin(p.y * 5.73 + t * 3.19) * 1.96 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.64 - t * 8.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.30;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.73, lr * 1.40 + time * 0.43); }
	p *= 2.23;
	p += vec2(0.15, 0.78) * sin(length(p) * 3.03 - time * 1.73) * 0.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.60);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.78 + time * 0.15, vec3(0.53, 0.40, 0.45), vec3(0.42, 0.30, 0.40), vec3(1.30, 0.86, 1.33), vec3(0.30, 0.56, 0.21));
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
