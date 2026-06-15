uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.27 + vec2(t * 2.82, -t * 2.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2(length(p) * 3.98 + time * 0.78) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.08, vec3(0.47, 0.50, 0.50), vec3(0.41, 0.38, 0.35), vec3(0.99, 1.05, 1.38), vec3(0.57, 0.68, 0.31));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
