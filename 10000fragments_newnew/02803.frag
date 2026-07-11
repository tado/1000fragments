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
	p *= 2.62;
	p = rot2(time * -0.62) * p;
	vec2 gp = p * 3.26;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.15 - 0.11 * sin(time * 5.75 + rnd * 6.2831853)) * 15.45);
	vec3 col = palette(v * 0.99 + time * 0.21, vec3(0.41, 0.47, 0.43), vec3(0.35, 0.39, 0.45), vec3(0.73, 0.93, 1.22), vec3(0.65, 0.29, 0.50));
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
