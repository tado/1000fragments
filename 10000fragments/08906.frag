uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	vec3 col = vec3(0.042, 0.044, 0.071);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.34 + 3.48) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.71;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 8.37 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.66, 0.55, 0.37), vec3(0.59, 0.92, 0.90), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col = fract(col * 1.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
