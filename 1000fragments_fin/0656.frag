uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	vec3 col = mix(vec3(0.021, 0.029, 0.039), vec3(0.027, 0.048, 0.068), clamp(0.5 + p.y * 0.34 + p.x * -0.19, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.79 + 4.91) + vec2(fl * 7.31, -(time * 0.77) * 1.40 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.57;
		float pd = length((gv - off) * vec2(7.28, 1.0));
		float tw = 0.80 + 0.36 * sin((time * 0.77) * 5.33 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.52, 0.96, 0.75), vec3(0.35, 0.95, 0.76), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.029, 0.995, 0.942);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
