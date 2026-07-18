uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.11 + (time * 0.58) * 0.92) * 0.14;
	vec3 col = vec3(0.037, 0.021, 0.069);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.58) * 0.14 * fl) * p * (fl * 0.88 + 2.32) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.68;
		float pd = length(gv - off);
		float tw = 0.66 + 0.18 * sin((time * 0.58) * 5.85 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.24, 0.38, 0.92), vec3(0.49, 0.52, 0.50), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.965, 1.007, 0.934);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
