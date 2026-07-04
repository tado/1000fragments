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
		q = abs(q) - vec3(0.33, 0.75, 0.46);
		q.xy = rot2(0.58 + time * 0.26) * q.xy;
		q.xz = rot2(1.40) * q.xz;
		q *= 1.32; sc *= 1.32;
	}
	vec3 b = abs(q) - vec3(0.40);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.02);
	vec3 rd = normalize(vec3(p, 1.09));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.40 + time * 0.30, vec3(0.52, 0.43, 0.41), vec3(0.49, 0.45, 0.40), vec3(1.10, 1.14, 0.85), vec3(0.63, 0.70, 0.89)) * fog;
	col += vec3(1.00, 0.91, 0.63) * (it / 54.0) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
