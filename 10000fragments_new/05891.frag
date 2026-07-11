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
	p *= 1.14;
	vec2 gp = p * 3.33;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.86 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 17.75 + rnd * 6.2831853 + time * 3.59);
	vec3 col = palette(v * 1.12 + time * 0.06, vec3(0.57, 0.42, 0.43), vec3(0.32, 0.30, 0.50), vec3(0.83, 1.17, 0.73), vec3(0.16, 0.37, 0.73));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
