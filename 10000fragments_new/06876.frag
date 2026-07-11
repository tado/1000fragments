uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec3 col = vec3(0.050, 0.016, 0.079);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.78 + 3.46) + vec2(time * -0.11, time * -0.55) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.79;
		float pd = length(gv - off);
		float tw = 0.74 + 0.25 * sin(time * 4.79 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.49, 0.75, 0.45), vec3(1.00, 0.42, 0.35), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
