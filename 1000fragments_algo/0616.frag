uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.58;
	vec3 col = vec3(0.045, 0.010, 0.051);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.29 + 2.47) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.90;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin((time * 0.64) * 8.13 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.28, 0.92, 0.57), vec3(0.80, 0.54, 0.65), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.944, 1.027) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
