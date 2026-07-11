uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	p = rot2(time * 1.25) * p;
	vec2 gp = p * 6.69;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 25.33 - time * 4.79 + rnd * 6.2831853);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 4.45 + time * 0.56);
	col *= 0.54 + 0.31 * hash21(id + 11.0);
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 1.06 + time * 4.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
