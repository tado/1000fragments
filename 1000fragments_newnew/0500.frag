uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 2.08;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 15.56 - (time * 0.73) * 3.82 + rnd * 6.2831853);
	vec3 col = palette((v) * 1.10 + (time * 0.73) * 0.06, vec3(0.29, 0.26, 0.32), vec3(0.08, 0.15, 0.14), vec3(0.69, 0.45, 0.75), vec3(0.01, 0.81, 0.09));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.919, 0.976, 1.037) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
