uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	p = rot2(time * 1.55) * p;
	vec2 gp = p * 4.64;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 20.36 - time * 2.60 + rnd * 6.2831853);
	vec3 col = palette(v * 1.32 + time * 0.25, vec3(0.46, 0.45, 0.59), vec3(0.41, 0.49, 0.43), vec3(0.95, 1.35, 1.06), vec3(0.28, 0.77, 0.94));
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
