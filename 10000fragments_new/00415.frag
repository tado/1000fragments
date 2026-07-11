uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 4.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 18.80 - time * 6.46 + rnd * 6.2831853);
	vec3 col = palette(v * 0.87 + time * 0.06, vec3(0.45, 0.54, 0.53), vec3(0.43, 0.49, 0.46), vec3(1.18, 0.88, 1.22), vec3(0.84, 0.59, 0.13));
	col = mod(col * 1.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
