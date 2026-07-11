uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.07 + (time * 0.53) * 0.96) * 0.06;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.018, 0.007, 0.039);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.53) * 0.21 * fl) * p * (fl * 0.82 + 1.95) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.53;
		float pd = length(gv - off);
		float tw = 0.63 + 0.20 * sin((time * 0.53) * 3.52 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.27, 0.89, 0.84), vec3(0.43, 0.57, 0.98), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 2.52 + (time * 0.53) * 16.07);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.951, 1.006) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
