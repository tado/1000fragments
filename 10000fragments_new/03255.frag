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
	p *= 2.22;
	vec2 gp = p * 5.07;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.53 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 13.94 + rnd * 6.2831853 + time * 3.67);
	vec3 col = palette(v * 1.43 + time * 0.09, vec3(0.49, 0.56, 0.44), vec3(0.47, 0.34, 0.40), vec3(0.81, 1.08, 1.37), vec3(0.16, 0.74, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
