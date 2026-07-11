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
		q = abs(q) - vec3(0.45, 0.71, 0.78);
		q.xy = rot2(0.75 + time * 0.35) * q.xy;
		q.xz = rot2(0.71) * q.xz;
		q *= 1.53; sc *= 1.53;
	}
	vec3 b = abs(q) - vec3(0.44);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.23);
	vec3 rd = normalize(vec3(p, 1.64));
	rd.xy = rot2(time * -0.27) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.18 + time * 0.00, vec3(0.49, 0.50, 0.51), vec3(0.30, 0.45, 0.48), vec3(0.81, 0.93, 1.14), vec3(0.11, 0.20, 0.19)) * fog;
	col += vec3(0.91, 0.34, 0.82) * (it / 59.0) * 0.33;
	col = fract(col * 1.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
