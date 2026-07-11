uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.75;
	vec2 g = mod(vec2(q.x, q.z), 2.32) - 1.16;
	float d = length(g) - (0.26 + 0.11 * sin(q.y * 3.53 + time * 3.51));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.57));
	rd.xy = rot2(time * 0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.37 + time * 0.36, vec3(0.44, 0.42, 0.51), vec3(0.37, 0.36, 0.41), vec3(0.76, 0.95, 0.78), vec3(0.54, 1.00, 0.59)) * fog;
	col += vec3(0.46, 0.27, 0.24) * (it / 61.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
