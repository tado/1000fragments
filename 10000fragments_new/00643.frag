uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.07) * p;
	vec2 gp = p * 6.76;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 24.19 - time * 2.57 + rnd * 6.2831853);
	vec3 col = vec3(0.64, 0.57, 0.86) * (0.18 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.66 + 0.38 * hash21(id + 11.0);
	col = fract(col * 1.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
