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
	p *= 2.65;
	p = rot2(time * 1.05) * p;
	vec2 gp = p * 6.63;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.24 - 0.16 * sin(time * 2.78 + rnd * 6.2831853)) * 11.60);
	vec3 col = palette(v * 0.97 + time * 0.33, vec3(0.52, 0.55, 0.52), vec3(0.46, 0.40, 0.36), vec3(1.13, 1.05, 1.11), vec3(0.67, 0.77, 0.07));
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 2.23 + time * 15.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
