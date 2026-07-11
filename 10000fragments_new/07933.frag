uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 5.38;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 12.09 - time * 5.39 + rnd * 6.2831853);
	vec3 col = palette(v * 1.01 + time * 0.38, vec3(0.41, 0.52, 0.58), vec3(0.33, 0.42, 0.44), vec3(1.24, 1.27, 0.80), vec3(0.82, 0.11, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
