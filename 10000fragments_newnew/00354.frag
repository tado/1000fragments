uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.68;
	vec2 g = mod(vec2(q.x, q.z), 2.33) - 1.17;
	float d = length(g) - (0.16 + 0.07 * sin(q.y * 2.54 + time * 1.40));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.25 + time * 0.02, vec3(0.60, 0.54, 0.55), vec3(0.48, 0.38, 0.44), vec3(1.33, 0.78, 0.94), vec3(0.53, 0.71, 0.57)) * fog;
	col += vec3(0.38, 0.51, 0.67) * (it / 52.0) * 0.37;
	col = mod(col * 1.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
