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
	p *= 2.69;
	p = rot2(time * 1.50) * p;
	vec2 gp = p * 3.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 15.31 + rnd * 6.2831853 + time * 2.81);
	vec3 col = palette(v * 0.40 + time * 0.26, vec3(0.43, 0.55, 0.47), vec3(0.30, 0.34, 0.31), vec3(1.16, 0.81, 1.25), vec3(0.27, 0.39, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
