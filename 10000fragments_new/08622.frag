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
	p *= 2.74;
	p = rot2(time * 0.57) * p;
	vec2 gp = p * 3.57;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 2.18 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 17.45 + rnd * 6.2831853 + time * 2.00);
	vec3 col = palette(v * 0.75 + time * 0.36, vec3(0.49, 0.49, 0.40), vec3(0.45, 0.48, 0.46), vec3(0.94, 1.12, 0.86), vec3(0.70, 0.09, 0.54));
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
