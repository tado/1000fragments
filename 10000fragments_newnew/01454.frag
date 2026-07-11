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
		q = abs(q) - vec3(0.34, 0.57, 0.68);
		q.xy = rot2(0.54 + time * 0.13) * q.xy;
		q.xz = rot2(1.35) * q.xz;
		q *= 1.59; sc *= 1.59;
	}
	vec3 b = abs(q) - vec3(0.50);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.30);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.40 + time * 0.39, vec3(0.43, 0.52, 0.48), vec3(0.30, 0.49, 0.36), vec3(1.32, 1.20, 1.35), vec3(0.66, 0.46, 0.69)) * fog;
	col += vec3(0.40, 0.73, 0.45) * (it / 58.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
