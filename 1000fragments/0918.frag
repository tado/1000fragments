uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.56 - t * 1.44 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.09 - t * 3.77 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	p *= 1.32;
	p = rot2(length(p) * 1.51 + time * 0.56) * p;
	p = abs(p) - 0.65;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.97 + time * 0.19, vec3(0.50, 0.41, 0.56), vec3(0.48, 0.31, 0.43), vec3(0.96, 1.09, 1.34), vec3(0.45, 0.21, 0.23));
	col = fract(col * 2.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
