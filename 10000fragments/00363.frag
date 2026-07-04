uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.79 + t * 4.34 + ph) + sin(p.y * 10.41 - t * 3.41 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.96 - t * 1.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.67, lr * 1.06 + time * 0.75); }
	p = rot2(time * 1.21) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.67 + time * 0.23, vec3(0.43, 0.53, 0.60), vec3(0.35, 0.46, 0.45), vec3(0.95, 1.37, 1.23), vec3(0.46, 0.20, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
