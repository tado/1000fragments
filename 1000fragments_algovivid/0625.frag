uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.75;
	vec3 col = vec3(0.018, 0.032, 0.035);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.15 + 4.55) + vec2(fl * 7.31, -(time * 0.56) * 3.99 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.71;
		float pd = length((gv - off) * vec2(4.38, 1.0));
		float tw = 0.74 + 0.19 * sin((time * 0.56) * 3.40 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.67, 0.85, 0.35), vec3(0.66, 0.38, 0.27), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col += (hash21(gl_FragCoord.xy + fract((time * 0.56)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 0.949, 1.014) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
