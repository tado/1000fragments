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
	vec3 col = mix(vec3(0.057, 0.045, 0.080), vec3(0.056, 0.055, 0.060), clamp(0.5 + p.y * -0.52 + p.x * -0.17, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.82) * 0.11 * fl) * p * (fl * 1.34 + 3.04) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.77;
		float pd = length(gv - off);
		float tw = 0.67 + 0.40 * sin((time * 0.82) * 2.83 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.31, 0.97, 0.91), vec3(0.87, 0.91, 0.50), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.930, 0.986, 1.043);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
