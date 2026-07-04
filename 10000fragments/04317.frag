uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	vec3 col = vec3(0.010, 0.013, 0.021);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.17 + 2.69) + vec2(time * -0.40, time * -0.29) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.66;
		float pd = length(gv - off);
		float tw = 0.72 + 0.33 * sin(time * 5.62 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.65, 0.98, 0.83), vec3(0.26, 0.68, 0.39), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
