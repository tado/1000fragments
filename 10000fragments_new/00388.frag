uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	p = rot2(time * 0.34) * p;
	vec2 gp = p * 4.43;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.00 + rnd * 6.2831853 + time * 4.04);
	vec3 col = palette(v * 0.85 + time * 0.23, vec3(0.60, 0.45, 0.45), vec3(0.46, 0.45, 0.43), vec3(0.87, 1.35, 1.39), vec3(0.74, 0.81, 0.76));
	col *= 0.69 + 0.41 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
