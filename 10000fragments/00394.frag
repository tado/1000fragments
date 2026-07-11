uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.13 + t * 5.95 + ph) + sin(p.y * 10.45 - t * 4.44 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	p = rot2(time * -0.76) * p;
	{ p = vec2(atan(p.y, p.x) * 1.02, length(p) * 3.41 - time * 0.49); }
	p = fract(p * 1.47) - 0.5;
	p = rot2(length(p) * -3.72 + time * 0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.00, vec3(0.49, 0.42, 0.55), vec3(0.38, 0.43, 0.36), vec3(0.71, 0.74, 1.27), vec3(0.16, 0.75, 0.21));
	col = fract(col * 1.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
