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
	p = rot2(time * 0.55) * p;
	vec2 gp = p * 7.56;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 20.40 + rnd * 6.2831853 + time * 4.17);
	vec3 col = palette(v * 1.08 + time * 0.39, vec3(0.46, 0.47, 0.54), vec3(0.42, 0.30, 0.45), vec3(1.31, 1.35, 0.89), vec3(0.06, 0.07, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
