uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	vec3 col = vec3(0.021, 0.047, 0.040);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.48 + 4.39) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.78;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin(time * 3.57 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.86, 0.70, 0.36), vec3(0.37, 0.79, 0.99), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col = fract(col * 1.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
