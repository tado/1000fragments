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
	vec2 gp = p * 7.17;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 17.03 - (time * 0.74) * 2.40 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.81 + (time * 0.74) * 0.18, vec3(0.36, 0.34, 0.39), vec3(0.11, 0.17, 0.15), vec3(0.71, 0.51, 0.41), vec3(0.12, 0.41, 0.24));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.913, 0.966, 1.054) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
