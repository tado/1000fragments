uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.63 + (time * 0.68) * 0.64) * 0.06;
	p = p.yx;
	p *= 2.68;
	vec3 col = vec3(0.017, 0.036, 0.028);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.68) * -0.13 * fl) * p * (fl * 1.21 + 2.90) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.69;
		float pd = length(gv - off);
		float tw = 0.61 + 0.16 * sin((time * 0.68) * 4.17 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.72, 0.62, 0.85), vec3(0.72, 0.99, 0.37), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.038, 0.985, 0.926);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
