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
	p *= 1.70;
	p = rot2(time * -0.97) * p;
	vec2 gp = p * 2.47;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 26.75 - time * 5.29 + rnd * 6.2831853);
	vec3 col = palette(v * 1.45 + time * 0.19, vec3(0.50, 0.52, 0.41), vec3(0.50, 0.36, 0.37), vec3(1.37, 0.95, 1.04), vec3(0.42, 0.58, 0.04));
	col = mod(col * 2.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
