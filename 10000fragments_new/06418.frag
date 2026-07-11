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
	vec2 gp = p * 2.10;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 17.52 - time * 2.32 + rnd * 6.2831853);
	vec3 col = palette(v * 0.51 + time * 0.34, vec3(0.49, 0.41, 0.51), vec3(0.41, 0.36, 0.33), vec3(1.40, 1.16, 1.08), vec3(0.24, 0.03, 0.85));
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
