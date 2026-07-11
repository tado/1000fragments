uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.43 + ga * 2.0 - t * 1.63 + ph);
    v = arm * exp(-gr * 0.53);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.80) * p * 8.21;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 0.98 + time * 0.05, vec3(0.57, 0.56, 0.59), vec3(0.49, 0.46, 0.40), vec3(1.23, 1.10, 1.31), vec3(0.17, 0.07, 0.76)) * v;
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
