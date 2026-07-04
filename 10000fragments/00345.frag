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
		q = abs(q) - vec3(0.62, 0.56, 0.49);
		q.xy = rot2(1.23 + time * 0.17) * q.xy;
		q.xz = rot2(1.12) * q.xz;
		q *= 1.64; sc *= 1.64;
	}
	vec3 b = abs(q) - vec3(0.32);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.44);
	vec3 rd = normalize(vec3(p, 1.45));
	rd.xy = rot2(time * 0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.23 + time * 0.28, vec3(0.53, 0.45, 0.57), vec3(0.33, 0.37, 0.41), vec3(1.35, 1.34, 0.81), vec3(0.49, 0.76, 0.05)) * fog;
	col += vec3(0.23, 0.90, 0.45) * (it / 70.0) * 0.87;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
