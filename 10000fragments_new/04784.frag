uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	vec2 gp = p * 3.27;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.14 * sin(time * 2.55 + rnd * 6.2831853)) * 23.61);
	vec3 col = hue(v * 1.09 + time * 0.19);
	col *= 0.60 + 0.34 * hash21(id + 11.0);
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 2.15 + time * 12.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
