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
	p *= 2.77;
	p = rot2(time * 1.57) * p;
	vec2 gp = p * 5.89;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 13.55 + rnd * 6.2831853 + time * 5.68);
	vec3 col = palette(v * 1.29 + time * 0.27, vec3(0.45, 0.50, 0.57), vec3(0.34, 0.50, 0.35), vec3(1.15, 0.72, 0.97), vec3(0.27, 0.03, 0.89));
	col = mod(col * 2.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
