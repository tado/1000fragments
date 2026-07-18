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
	p += vec2(sin((time * 0.80) * 1.16), cos((time * 0.80) * 0.74)) * 0.07;
	p.x += p.y * -0.74;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	vec3 col = mix(vec3(0.025, 0.044, 0.069), vec3(0.046, 0.041, 0.081), clamp(0.5 + p.y * 0.07 + p.x * 0.10, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.80) * 0.30 * fl) * p * (fl * 1.18 + 3.26) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.76;
		float pd = length(gv - off);
		float tw = 0.72 + 0.36 * sin((time * 0.80) * 2.22 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.96, 0.25, 0.33), vec3(0.50, 0.62, 0.82), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.937, 0.989, 1.030);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
