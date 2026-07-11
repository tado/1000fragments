uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	vec3 col = vec3(0.021, 0.045, 0.058);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.21 + 3.77) + vec2(time * -0.19, time * -0.54) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.68;
		float pd = length(gv - off);
		float tw = 0.75 + 0.20 * sin(time * 2.21 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.22, 0.78, 0.64), vec3(0.73, 0.88, 0.94), hash21(id + 7.0));
		col += tint * smoothstep(0.10, 0.0, pd) * tw / fl;
	}
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
