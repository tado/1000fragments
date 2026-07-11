uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.21 - t * 8.86 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.89 - t * 1.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	p = rot2(time * -0.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.24 + time * 0.08, vec3(0.44, 0.59, 0.46), vec3(0.38, 0.43, 0.32), vec3(1.17, 1.10, 1.31), vec3(0.84, 0.10, 1.00));
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
