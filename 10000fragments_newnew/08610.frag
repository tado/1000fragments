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
	p *= 1.87;
	p = rot2(time * -0.52) * p;
	vec2 gp = p * 4.57;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 10.67 + rnd * 6.2831853 + time * 5.76);
	vec3 col = palette(v * 1.15 + time * 0.39, vec3(0.40, 0.45, 0.55), vec3(0.43, 0.32, 0.35), vec3(1.16, 0.83, 1.39), vec3(0.20, 0.23, 0.65));
	col *= 0.67 + 0.46 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
