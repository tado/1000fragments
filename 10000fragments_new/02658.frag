uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	vec3 col = vec3(0.007, 0.013, 0.023);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.46 + 4.08) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.87;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 4.81 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.67, 0.65, 0.23), vec3(0.77, 0.96, 0.61), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
