uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	vec3 col = vec3(0.035, 0.002, 0.067);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.01 + 2.73) + vec2(time * -0.44, time * 0.30) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.54;
		float pd = length(gv - off);
		float tw = 0.66 + 0.33 * sin(time * 3.32 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.99, 0.81, 0.62), vec3(0.80, 0.31, 0.54), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 1.13 + time * 11.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
