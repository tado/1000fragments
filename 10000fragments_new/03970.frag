uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	p = rot2(time * -1.40) * p;
	vec2 gp = p * 2.33;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.20 - 0.13 * sin(time * 1.70 + rnd * 6.2831853)) * 16.77);
	vec3 col = vec3(0.99, 0.74, 0.65) * (0.19 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.63 + 0.33 * hash21(id + 11.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
