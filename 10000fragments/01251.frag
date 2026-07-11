uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.51 + t * 0.79 + ph) + sin(p.y * 8.52 - t * 0.79 + ph)
        + sin((p.x + p.y) * 4.18 + t * 0.79 + ph) + sin(length(p) * 6.53 - t * 0.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.85, lr * 2.60 + time * 0.58); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.17, vec3(0.50, 0.59, 0.51), vec3(0.35, 0.50, 0.36), vec3(1.13, 0.86, 0.72), vec3(0.52, 0.26, 0.70));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
