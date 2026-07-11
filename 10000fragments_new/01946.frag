uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	vec3 col = vec3(0.037, 0.033, 0.029);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.19 + 5.96) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.54;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 3.87 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.49, 0.57, 0.92), vec3(0.68, 0.87, 0.27), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 1.08 + time * 4.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
