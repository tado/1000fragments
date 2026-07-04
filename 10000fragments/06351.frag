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
	p *= 1.19;
	p = rot2(time * 1.17) * p;
	vec2 gp = p * 2.90;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 19.51 + rnd * 6.2831853 + time * 5.04);
	vec3 col = palette(v * 1.10 + time * 0.39, vec3(0.47, 0.42, 0.54), vec3(0.37, 0.47, 0.45), vec3(0.91, 1.12, 1.08), vec3(0.29, 0.73, 0.28));
	col = mod(col * 1.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
