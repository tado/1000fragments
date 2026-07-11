uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 7.91;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 17.21 - time * 3.44 + rnd * 6.2831853);
	vec3 col = palette(v * 1.07 + time * 0.25, vec3(0.60, 0.50, 0.59), vec3(0.42, 0.40, 0.37), vec3(0.93, 1.11, 0.99), vec3(0.71, 0.99, 0.36));
	col = mod(col * 2.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
