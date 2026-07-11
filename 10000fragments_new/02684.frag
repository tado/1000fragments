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
	vec2 gp = p * 7.53;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 19.61 - time * 6.32 + rnd * 6.2831853);
	vec3 col = palette(v * 1.32 + time * 0.19, vec3(0.56, 0.41, 0.48), vec3(0.41, 0.35, 0.41), vec3(1.15, 1.07, 1.36), vec3(0.56, 0.78, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
