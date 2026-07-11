uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	vec2 gp = p * 6.79;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.24 - 0.10 * sin(time * 1.94 + rnd * 6.2831853)) * 18.17);
	vec3 col = hue(v * 1.46 + time * 0.31);
	col *= 0.52 + 0.41 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
