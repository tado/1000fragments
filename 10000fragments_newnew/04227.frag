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
	p = rot2(time * -1.47) * p;
	vec2 gp = p * 3.14;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.22 - 0.13 * sin(time * 5.08 + rnd * 6.2831853)) * 17.60);
	vec3 col = palette(v * 1.06 + time * 0.33, vec3(0.44, 0.41, 0.44), vec3(0.36, 0.37, 0.32), vec3(0.79, 0.98, 1.25), vec3(0.14, 0.21, 0.53));
	col *= 0.66 + 0.46 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
