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
	p *= 1.73;
	vec2 gp = p * 4.48;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.53 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 16.24 + rnd * 6.2831853 + time * 1.28);
	vec3 col = palette(v * 0.96 + time * 0.35, vec3(0.58, 0.48, 0.49), vec3(0.44, 0.50, 0.49), vec3(0.92, 1.24, 1.27), vec3(0.19, 0.41, 0.49));
	col = mod(col * 1.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
