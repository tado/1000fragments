uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.34, 0.68, 0.51);
		q.xy = rot2(0.41 + time * 0.25) * q.xy;
		q.xz = rot2(0.55) * q.xz;
		q *= 1.33; sc *= 1.33;
	}
	vec3 b = abs(q) - vec3(0.36);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.08));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.25 + time * 0.30, vec3(0.46, 0.51, 0.49), vec3(0.33, 0.48, 0.49), vec3(0.93, 1.09, 1.31), vec3(0.61, 0.27, 0.42)) * fog;
	col += vec3(0.40, 0.75, 0.39) * (it / 67.0) * 0.57;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
