uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.01 - t * 2.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 1.11 + time * -0.41); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.14, vec3(0.53, 0.55, 0.45), vec3(0.33, 0.40, 0.30), vec3(1.29, 1.32, 1.00), vec3(0.53, 0.39, 0.66));
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
