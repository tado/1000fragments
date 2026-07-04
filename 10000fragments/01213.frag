uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.62;
	vec3 col = vec3(0.020, 0.003, 0.073);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.13 + 4.23) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.75;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 8.49 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.55, 0.94, 0.51), vec3(0.92, 0.97, 0.66), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
