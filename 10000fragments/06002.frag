uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.038, 0.031, 0.009);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.01 + 2.54) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.77;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 7.33 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.53, 0.97, 0.31), vec3(0.87, 0.53, 0.35), hash21(id + 7.0));
		col += tint * smoothstep(0.14, 0.0, pd) * tw / fl;
	}
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 1.53 + time * 9.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
