uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.76 + sin(p.y * 1.55 + t * 3.57) * 4.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.88) * p;
	p = rot2(time * -1.04) * p;
	p = rot2(length(p) * 2.83 + time * 0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.20, vec3(0.59, 0.59, 0.43), vec3(0.39, 0.32, 0.36), vec3(1.25, 1.11, 0.75), vec3(0.74, 0.87, 0.85));
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
