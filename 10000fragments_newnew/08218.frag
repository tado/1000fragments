uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	vec2 gp = p * 4.50;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 14.47 - time * 5.14 + rnd * 6.2831853);
	vec3 col = palette(v * 1.16 + time * 0.34, vec3(0.57, 0.57, 0.57), vec3(0.48, 0.49, 0.47), vec3(0.87, 1.28, 0.99), vec3(0.67, 0.66, 0.84));
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 2.47 + time * 10.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
