uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.52;
	vec2 gp = p * 4.37;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 25.55 - time * 5.27 + rnd * 6.2831853);
	vec3 col = palette(v * 0.44 + time * 0.35, vec3(0.53, 0.50, 0.59), vec3(0.32, 0.35, 0.31), vec3(1.12, 0.74, 1.32), vec3(0.58, 0.01, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
