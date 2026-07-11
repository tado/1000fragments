uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.58) * 0.59), cos((time * 0.58) * 0.81)) * 0.15;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	p = rot2((time * 0.58) * -0.82) * p;
	vec2 gp = p * 2.00;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 19.56 - (time * 0.58) * 4.11 + rnd * 6.2831853);
	vec3 col = vec3(0.46, 0.52, 0.48) * (0.09 / (abs((v)) + 0.05));
	col = col / (1.0 + col);
	col *= 0.66 + 0.45 * hash21(id + 11.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 0.992, 0.986) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
