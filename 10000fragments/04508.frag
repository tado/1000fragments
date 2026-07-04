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
	p *= 1.24;
	p = rot2(time * -0.41) * p;
	vec2 gp = p * 6.94;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 9.63 + rnd * 6.2831853 + time * 6.05);
	vec3 col = palette(v * 1.35 + time * 0.31, vec3(0.51, 0.52, 0.42), vec3(0.50, 0.36, 0.33), vec3(1.24, 0.79, 0.87), vec3(0.68, 0.05, 0.06));
	col *= 0.61 + 0.37 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
