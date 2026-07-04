uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.038, 0.037, 0.059);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.85 + 4.20) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.55;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 8.93 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.90, 0.94, 0.57), vec3(0.89, 0.67, 0.85), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col *= 0.89 + 0.20 * sin(gl_FragCoord.y * 2.06 + time * 7.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
