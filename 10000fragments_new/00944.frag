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
	vec2 gp = p * 2.84;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 2.49 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 19.62 + rnd * 6.2831853 + time * 3.17);
	vec3 col = palette(v * 1.46 + time * 0.24, vec3(0.57, 0.44, 0.57), vec3(0.37, 0.44, 0.46), vec3(1.22, 0.72, 1.28), vec3(0.80, 0.60, 0.21));
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
