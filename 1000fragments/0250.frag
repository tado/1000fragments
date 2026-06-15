uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.52 + sin(p.y * 1.64 + t * 1.36) * 2.50 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	p = rot2(length(p) * 3.84 + time * 0.62) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.07, vec3(0.43, 0.44, 0.56), vec3(0.32, 0.45, 0.46), vec3(0.91, 1.30, 1.02), vec3(0.90, 0.73, 0.10));
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
