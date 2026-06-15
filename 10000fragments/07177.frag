uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.37 - t * 1.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	p = rot2(1.98) * p;
	p = rot2(p.y * 1.66 + time * 0.49) * p;
	p = rot2(time * 0.74) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.02, vec3(0.40, 0.46, 0.49), vec3(0.33, 0.39, 0.49), vec3(1.16, 0.88, 1.05), vec3(0.19, 0.78, 0.90));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
