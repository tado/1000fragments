uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.27) * p;
	vec2 gp = p * 2.42;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 16.89 + rnd * 6.2831853 + time * 5.53);
	vec3 col = palette(v * 1.09 + time * 0.24, vec3(0.46, 0.46, 0.56), vec3(0.33, 0.49, 0.31), vec3(1.15, 1.16, 0.99), vec3(0.13, 0.62, 0.71));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
