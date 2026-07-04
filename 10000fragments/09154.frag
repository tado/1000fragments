uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	vec3 col = vec3(0.002, 0.045, 0.035);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.55 + 2.36) + vec2(time * 0.54, time * -0.50) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.86;
		float pd = length(gv - off);
		float tw = 0.71 + 0.23 * sin(time * 5.91 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.62, 0.77, 0.75), vec3(0.24, 0.53, 0.86), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	col = mod(col * 1.46, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
