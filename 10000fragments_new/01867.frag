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
	p *= 1.97;
	p = rot2(time * -0.85) * p;
	vec2 gp = p * 4.21;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 10.91 - time * 7.58 + rnd * 6.2831853);
	vec3 col = palette(v * 1.05 + time * 0.23, vec3(0.58, 0.45, 0.45), vec3(0.32, 0.40, 0.49), vec3(1.26, 1.32, 0.70), vec3(0.92, 0.55, 0.77));
	col *= 0.68 + 0.40 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
