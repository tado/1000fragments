uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.43 + t * 0.68 + ph) + sin(p.y * 7.73 - t * 0.68 + ph)
        + sin((p.x + p.y) * 9.38 + t * 0.68 + ph) + sin(length(p) * 5.40 - t * 0.68 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	p *= 1.26;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 2.28 + time * 0.42); }
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.20, vec3(0.50, 0.59, 0.58), vec3(0.36, 0.34, 0.32), vec3(0.80, 1.18, 0.85), vec3(0.87, 0.86, 0.76));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
