uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	vec3 col = vec3(0.018, 0.015, 0.075);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.03 + 3.42) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.87;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 3.03 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.28, 0.91, 0.70), vec3(0.93, 0.41, 0.78), hash21(id + 7.0));
		col += tint * smoothstep(0.18, 0.0, pd) * tw / fl;
	}
	col *= 0.83 + 0.20 * sin(gl_FragCoord.y * 0.97 + time * 12.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
