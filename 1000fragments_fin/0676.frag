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
	p *= 1.29;
	vec3 col = mix(vec3(0.038, 0.039, 0.070), vec3(0.026, 0.058, 0.065), clamp(0.5 + p.y * -0.30 + p.x * 0.22, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.71) * 0.12 * fl) * p * (fl * 0.97 + 3.37) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.70;
		float pd = length(gv - off);
		float tw = 0.79 + 0.27 * sin((time * 0.71) * 1.66 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.22, 0.79, 1.00), vec3(0.43, 0.36, 0.21), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.948, 0.981, 1.053);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
