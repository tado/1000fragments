uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.83;
	vec2 g = mod(vec2(q.x, q.z), 2.44) - 1.22;
	float d = length(g) - (0.19 + 0.06 * sin(q.y * 1.56 + time * 2.15));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.29));
	rd.xy = rot2(time * -0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.17 + time * 0.34, vec3(0.48, 0.45, 0.52), vec3(0.32, 0.39, 0.37), vec3(0.79, 0.85, 0.75), vec3(0.37, 0.07, 0.74)) * fog;
	col += vec3(0.51, 0.62, 0.58) * (it / 60.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
