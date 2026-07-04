uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.82;
	vec2 g = mod(vec2(q.x, q.z), 1.89) - 0.95;
	float d = length(g) - (0.16 + 0.12 * sin(q.y * 3.09 + time * 2.80));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.95, 0.95, -3.0);
	vec3 rd = normalize(vec3(p, 1.54));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.35 + time * 0.32, vec3(0.56, 0.55, 0.54), vec3(0.31, 0.45, 0.43), vec3(1.30, 1.35, 0.90), vec3(0.94, 0.87, 0.41)) * fog;
	col += vec3(0.84, 0.27, 0.64) * (it / 55.0) * 0.67;
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
