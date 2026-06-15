uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.91 + t * 5.33 + ph) + sin(p.y * 11.52 - t * 1.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.47, lr * 1.20 + time * 0.41); }
	p = fract(p * 1.00) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.10, vec3(0.55, 0.59, 0.53), vec3(0.31, 0.30, 0.33), vec3(1.12, 1.34, 0.76), vec3(0.82, 0.47, 0.98));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
