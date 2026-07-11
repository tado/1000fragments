uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.93) * p;
	vec2 gp = p * 2.57;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 27.49 - time * 5.73 + rnd * 6.2831853);
	vec3 col = vec3(0.97, 0.67, 0.93) * (0.18 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
