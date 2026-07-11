uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	p = rot2(time * -1.03) * p;
	vec2 gp = p * 5.87;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 27.11 - time * 4.29 + rnd * 6.2831853);
	vec3 col = palette(v * 0.73 + time * 0.13, vec3(0.53, 0.53, 0.54), vec3(0.39, 0.32, 0.35), vec3(1.05, 1.01, 1.14), vec3(0.57, 0.33, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
