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
	p *= 2.47;
	p = rot2(time * 1.60) * p;
	vec2 gp = p * 5.04;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.07 + rnd * 6.2831853 + time * 4.07);
	vec3 col = palette(v * 1.04 + time * 0.28, vec3(0.51, 0.57, 0.54), vec3(0.35, 0.35, 0.40), vec3(1.34, 1.10, 1.23), vec3(0.71, 0.17, 0.82));
	col *= 0.66 + 0.49 * hash21(id + 11.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
