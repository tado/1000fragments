uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.01) * p;
	vec2 gp = p * 7.25;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.15 - 0.10 * sin(time * 2.08 + rnd * 6.2831853)) * 11.88);
	vec3 col = palette(v * 0.84 + time * 0.25, vec3(0.57, 0.51, 0.50), vec3(0.33, 0.42, 0.40), vec3(1.02, 1.31, 1.30), vec3(0.08, 0.21, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
