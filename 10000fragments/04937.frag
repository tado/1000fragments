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
		q = abs(q) - vec3(0.52, 0.31, 0.79);
		q.xy = rot2(0.71 + time * 0.11) * q.xy;
		q.xz = rot2(1.46) * q.xz;
		q *= 1.63; sc *= 1.63;
	}
	vec3 b = abs(q) - vec3(0.49);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.11);
	vec3 rd = normalize(vec3(p, 1.23));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.25 + time * 0.33, vec3(0.46, 0.56, 0.60), vec3(0.31, 0.39, 0.32), vec3(1.12, 1.06, 0.95), vec3(0.65, 0.21, 0.95)) * fog;
	col += vec3(0.32, 0.24, 0.41) * (it / 53.0) * 0.51;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.29 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
