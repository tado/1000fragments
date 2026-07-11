uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.64 + sin(p.y * 4.94 + t * 5.30) * 3.80 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	p = rot2(1.70) * p;
	p = rot2(length(p) * -1.61 + time * 1.28) * p;
	p = (floor(p * 19.6) + 0.5) / 19.6;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.01, vec3(0.48, 0.46, 0.43), vec3(0.48, 0.37, 0.48), vec3(0.98, 1.21, 1.36), vec3(0.09, 0.34, 0.65));
	col *= 0.83 + 0.17 * sin(gl_FragCoord.y * 1.47 + time * 4.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
