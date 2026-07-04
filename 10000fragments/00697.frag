uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.037, 0.001, 0.030);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.46 + 3.26) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.82;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 3.38 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.20, 0.21, 0.58), vec3(0.53, 0.63, 0.93), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 1.46 + time * 6.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
