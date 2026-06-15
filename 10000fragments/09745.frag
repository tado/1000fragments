uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.54 - t * 5.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	p = rot2(p.y * -2.65 + time * 0.25) * p;
	p = rot2(time * 0.82) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.29, vec3(0.47, 0.47, 0.57), vec3(0.47, 0.39, 0.44), vec3(1.23, 0.84, 0.76), vec3(0.73, 0.38, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
