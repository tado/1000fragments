uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 4.32;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 27.57 - time * 4.91 + rnd * 6.2831853);
	vec3 col = palette(v * 1.28 + time * 0.27, vec3(0.42, 0.42, 0.42), vec3(0.47, 0.34, 0.35), vec3(1.29, 0.97, 0.96), vec3(0.60, 0.56, 0.19));
	col = fract(col * 1.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
