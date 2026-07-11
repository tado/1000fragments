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
	p *= 1.31;
	p = rot2(time * 1.47) * p;
	vec2 gp = p * 2.16;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.09 + rnd * 6.2831853 + time * 2.53);
	vec3 col = palette(v * 1.33 + time * 0.33, vec3(0.44, 0.52, 0.46), vec3(0.36, 0.50, 0.38), vec3(1.09, 0.71, 1.17), vec3(0.66, 0.98, 0.49));
	col *= 0.57 + 0.42 * hash21(id + 11.0);
	col = mod(col * 2.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
