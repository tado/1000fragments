uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.24 * pow(abs(cos(ra * 7.0 + t * 1.87)), 1.15);
    v = sin((rr - pet) * 19.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2(length(p) * 3.65 + time * 1.01) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.31, lr * 1.67 + time * -0.32); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.30, vec3(0.49, 0.50, 0.52), vec3(0.33, 0.36, 0.35), vec3(1.09, 1.00, 1.13), vec3(0.90, 0.84, 0.35));
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
