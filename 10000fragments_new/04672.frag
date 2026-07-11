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
	p = rot2(time * 1.55) * p;
	vec2 gp = p * 3.87;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 20.96 - time * 4.78 + rnd * 6.2831853);
	vec3 col = palette(v * 0.84 + time * 0.24, vec3(0.47, 0.54, 0.53), vec3(0.39, 0.33, 0.47), vec3(1.13, 0.86, 1.30), vec3(0.71, 0.27, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
