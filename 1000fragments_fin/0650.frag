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
	p = p.yx;
	p *= 0.89;
	p *= 2.70;
	vec3 col = mix(vec3(0.026, 0.062, 0.069), vec3(0.013, 0.085, 0.127), clamp(0.5 + p.y * 0.18 + p.x * 0.17, 0.0, 1.0));
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.76) * 0.13 * fl) * p * (fl * 1.83 + 1.79) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.79;
		float pd = length(gv - off);
		float tw = 0.76 + 0.35 * sin((time * 0.76) * 3.07 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.76, 0.81, 0.27), vec3(0.88, 0.84, 0.87), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.020, 0.956, 0.999);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
