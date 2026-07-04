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
		q = abs(q) - vec3(0.39, 0.68, 0.75);
		q.xy = rot2(0.60 + time * 0.33) * q.xy;
		q.xz = rot2(0.90) * q.xz;
		q *= 1.48; sc *= 1.48;
	}
	vec3 b = abs(q) - vec3(0.56);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.37);
	vec3 rd = normalize(vec3(p, 1.10));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.37 + time * 0.03, vec3(0.50, 0.57, 0.50), vec3(0.49, 0.49, 0.34), vec3(0.97, 1.15, 0.81), vec3(0.84, 0.76, 0.11)) * fog;
	col += vec3(0.35, 0.43, 0.81) * (it / 58.0) * 0.88;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
