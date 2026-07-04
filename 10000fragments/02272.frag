uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	vec3 col = vec3(0.020, 0.042, 0.074);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.84 + 5.10) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.62;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 6.32 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.88, 0.61, 0.51), vec3(0.24, 0.59, 0.74), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
