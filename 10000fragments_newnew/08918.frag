uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.65;
	vec3 col = vec3(0.027, 0.046, 0.014);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.31 + 3.79) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.80;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 5.03 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.82, 0.71, 0.98), vec3(0.63, 0.94, 0.98), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	col *= 0.90 + 0.12 * sin(gl_FragCoord.y * 1.38 + time * 9.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
