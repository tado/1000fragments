uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.29 + sin(p.y * 1.27 + t * 1.54) * 4.42 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	p = rot2(length(p) * 1.42 + time * 0.86) * p;
	p = fract(p * 2.65) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.11, vec3(0.44, 0.42, 0.46), vec3(0.45, 0.31, 0.44), vec3(0.76, 0.92, 1.20), vec3(0.67, 0.31, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
