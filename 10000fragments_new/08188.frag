uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	vec2 gp = p * 7.80;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 18.11 - time * 5.88 + rnd * 6.2831853);
	vec3 col = hue(v * 1.37 + time * 0.38);
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 1.42 + time * 4.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
