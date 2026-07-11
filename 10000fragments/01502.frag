uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.55 - t * 2.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.57) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 2.32 + time * -0.11); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.00, vec3(0.41, 0.45, 0.57), vec3(0.41, 0.45, 0.46), vec3(1.05, 0.70, 1.06), vec3(0.61, 0.90, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
