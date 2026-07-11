uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.64 - t * 1.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.98 + time * 0.21) * p;
	p = rot2(1.82) * p;
	p *= 1.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.04, vec3(0.50, 0.49, 0.55), vec3(0.33, 0.31, 0.49), vec3(1.16, 1.21, 0.85), vec3(0.01, 0.94, 0.44));
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
