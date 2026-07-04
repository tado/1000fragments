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
		q = abs(q) - vec3(0.59, 0.66, 0.65);
		q.xy = rot2(0.51 + time * 0.41) * q.xy;
		q.xz = rot2(0.97) * q.xz;
		q *= 1.39; sc *= 1.39;
	}
	vec3 b = abs(q) - vec3(0.52);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.02);
	vec3 rd = normalize(vec3(p, 1.73));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.12 + time * 0.04, vec3(0.50, 0.53, 0.41), vec3(0.45, 0.42, 0.45), vec3(1.26, 0.73, 0.96), vec3(0.48, 0.92, 0.02)) * fog;
	col += vec3(0.85, 0.85, 0.50) * (it / 59.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
