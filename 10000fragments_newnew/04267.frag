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
	p *= 2.53;
	p = rot2(time * -1.37) * p;
	vec2 gp = p * 4.06;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 15.92 - time * 7.53 + rnd * 6.2831853);
	vec3 col = palette(v * 0.99 + time * 0.01, vec3(0.49, 0.56, 0.49), vec3(0.31, 0.43, 0.44), vec3(0.80, 0.77, 1.09), vec3(0.24, 0.96, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
