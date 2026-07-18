uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.80;
	p = p.yx;
	p *= 1.44;
	vec3 col = mix(vec3(0.029, 0.041, 0.091), vec3(0.049, 0.055, 0.078), clamp(0.5 + p.y * -0.32 + p.x * 0.04, 0.0, 1.0));
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.35 + 2.98) + vec2(fl * 7.31, -(time * 0.92) * 2.75 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.76;
		float pd = length((gv - off) * vec2(7.97, 1.0));
		float tw = 0.80 + 0.30 * sin((time * 0.92) * 5.12 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.79, 0.32, 0.97), vec3(0.72, 0.68, 0.73), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.942, 0.985, 1.049);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
