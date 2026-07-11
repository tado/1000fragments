uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.80 - t * 8.03 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.38 + sin(p.y * 5.73 + t * 1.63) * 1.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.64;
	p = rot2(p.y * 2.27 + time * 0.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.96);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + time * 0.22, vec3(0.54, 0.49, 0.44), vec3(0.43, 0.45, 0.38), vec3(0.78, 0.87, 0.96), vec3(0.26, 0.21, 0.40));
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
