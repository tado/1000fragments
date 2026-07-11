uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.60 + vec2(t * 2.66, -t * 2.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.64;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(1.56) * p; }
	p = fract(p * 1.72) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 1.19 + time * -0.59); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.16, vec3(0.45, 0.45, 0.50), vec3(0.45, 0.47, 0.38), vec3(0.80, 1.21, 1.13), vec3(0.38, 0.53, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
