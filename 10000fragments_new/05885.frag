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
	p *= 0.83;
	p = rot2(time * -1.44) * p;
	vec2 gp = p * 7.95;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.32 + rnd * 6.2831853 + time * 4.20);
	vec3 col = palette(v * 0.96 + time * 0.14, vec3(0.59, 0.45, 0.50), vec3(0.38, 0.48, 0.48), vec3(1.27, 0.72, 1.36), vec3(0.67, 0.77, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
