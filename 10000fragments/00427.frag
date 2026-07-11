uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.84 + t * 3.07 + ph) + sin(p.y * 12.92 - t * 1.68 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.50, 0.38) * sin(length(p) * 4.94 - time * 1.56) * 0.38;
	p = rot2(time * 0.59) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.19, lr * 1.13 + time * -0.28); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.07, vec3(0.55, 0.58, 0.48), vec3(0.39, 0.49, 0.36), vec3(1.25, 1.17, 0.88), vec3(0.60, 0.12, 0.37));
	col = fract(col * 1.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
