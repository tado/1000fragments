uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec3 col = vec3(0.048, 0.008, 0.079);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.50 + 3.29) + vec2(fl * 7.31, -(time * 0.57) * 1.51 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.70;
		float pd = length((gv - off) * vec2(5.24, 1.0));
		float tw = 0.81 + 0.16 * sin((time * 0.57) * 2.64 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.91, 0.86, 0.80), vec3(0.99, 0.94, 0.48), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.962, 1.019, 0.938) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
