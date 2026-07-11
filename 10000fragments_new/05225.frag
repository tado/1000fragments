uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 2.01;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 13.54 - time * 3.40 + rnd * 6.2831853);
	vec3 col = palette(v * 1.47 + time * 0.18, vec3(0.45, 0.50, 0.57), vec3(0.36, 0.48, 0.48), vec3(1.21, 1.14, 1.32), vec3(0.04, 0.44, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
