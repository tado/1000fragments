uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.43 - t * 4.81 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	p = rot2(time * -1.27) * p;
	p *= 2.82;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.17, vec3(0.44, 0.58, 0.48), vec3(0.33, 0.38, 0.45), vec3(1.08, 1.15, 1.34), vec3(0.76, 0.69, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
