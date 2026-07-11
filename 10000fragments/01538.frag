uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.44 - t * 3.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.71 - t * 6.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	p = abs(p) - 0.65;
	p = rot2(length(p) * 3.71 + time * 0.23) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = d1 + d2;
	vec3 col = palette(d * 0.72 + time * 0.27, vec3(0.48, 0.52, 0.52), vec3(0.37, 0.38, 0.49), vec3(0.91, 1.04, 1.14), vec3(0.66, 0.17, 0.31));
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
