uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.44 + t * 3.39 + ph) + sin(p.y * 16.62 - t * 2.58 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.49 + t * 3.70 + ph) + sin(p.y * 7.43 - t * 3.50 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 3.01 - time * 0.69); }
	p = rot2(3.08) * p;
	p = fract(p * 2.85) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = d1 + d2;
	vec3 col = palette(d * 0.82 + time * 0.27, vec3(0.46, 0.52, 0.41), vec3(0.42, 0.40, 0.49), vec3(0.91, 1.24, 1.05), vec3(0.85, 0.33, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
