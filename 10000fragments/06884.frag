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
		q = abs(q) - vec3(0.42, 0.54, 0.79);
		q.xy = rot2(1.40 + time * 0.13) * q.xy;
		q.xz = rot2(1.50) * q.xz;
		q *= 1.47; sc *= 1.47;
	}
	vec3 b = abs(q) - vec3(0.36);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.47);
	vec3 rd = normalize(vec3(p, 1.52));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.33 + time * 0.17, vec3(0.58, 0.45, 0.46), vec3(0.40, 0.33, 0.44), vec3(1.09, 0.73, 1.31), vec3(0.18, 0.84, 0.59)) * fog;
	col += vec3(0.57, 0.58, 0.22) * (it / 71.0) * 0.35;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.00 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
