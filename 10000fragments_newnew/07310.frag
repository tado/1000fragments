uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 6.80;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 21.80 - time * 3.72 + rnd * 6.2831853);
	vec3 col = palette(v * 1.11 + time * 0.35, vec3(0.49, 0.53, 0.45), vec3(0.35, 0.43, 0.42), vec3(0.98, 1.13, 0.96), vec3(0.12, 0.49, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
