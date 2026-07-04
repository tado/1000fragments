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
	p = rot2(time * -0.51) * p;
	vec2 gp = p * 2.59;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.18 - 0.09 * sin(time * 3.76 + rnd * 6.2831853)) * 14.81);
	vec3 col = palette(v * 1.24 + time * 0.32, vec3(0.47, 0.53, 0.47), vec3(0.46, 0.32, 0.39), vec3(1.24, 0.91, 0.84), vec3(0.03, 0.59, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
