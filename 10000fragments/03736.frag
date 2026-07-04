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
	p *= 2.63;
	vec3 col = vec3(0.019, 0.015, 0.067);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.78 + 3.06) + vec2(time * -0.52, time * -0.57) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.66;
		float pd = length(gv - off);
		float tw = 0.68 + 0.16 * sin(time * 2.56 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.59, 0.61, 0.24), vec3(0.49, 0.91, 0.45), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
