uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	vec2 gp = p * 7.58;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 25.54 - time * 7.75 + rnd * 6.2831853);
	vec3 col = palette(v * 0.90 + time * 0.32, vec3(0.41, 0.46, 0.57), vec3(0.44, 0.41, 0.43), vec3(1.14, 1.40, 1.15), vec3(0.95, 0.95, 0.11));
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 2.52 + time * 9.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
