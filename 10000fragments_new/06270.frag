uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.86 + sin(p.y * 5.61 + t * 2.91) * 2.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	p = abs(p) - 0.78;
	p = rot2(3.08) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.19, vec3(0.53, 0.48, 0.54), vec3(0.31, 0.46, 0.45), vec3(0.81, 0.76, 1.35), vec3(0.15, 0.57, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
