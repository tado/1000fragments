uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.24;
	p = rot2(time * -1.59) * p;
	vec2 gp = p * 2.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 17.96 - time * 7.22 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.42, 1.24, 1.45) + vec3(0.08, 0.24, 0.12);
	col = mod(col * 1.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
