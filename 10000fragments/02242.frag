uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.14 + t * 5.76 + ph) + sin(p.y * 4.74 - t * 5.21 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.59;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 2.52 + time * -0.65); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.05, vec3(0.51, 0.54, 0.46), vec3(0.34, 0.48, 0.33), vec3(1.33, 0.91, 1.37), vec3(0.06, 0.74, 0.75));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
