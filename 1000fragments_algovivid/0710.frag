uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	q.z += (time * 0.52) * 1.56;
	float g = dot(sin(q * 3.88), cos(q.zxy * 3.88));
	return (abs(g) - 0.62) / (3.88 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 0.83;
	vec3 ro = vec3(0.0, 0.0, -2.77);
	vec3 rd = normalize(vec3(p, 1.71));
	rd.xy = rot2((time * 0.52) * 0.22) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.13 + (time * 0.52) * 0.09, vec3(0.41, 0.34, 0.32), vec3(0.25, 0.24, 0.28), vec3(0.77, 0.88, 0.80), vec3(0.18, 0.49, 0.98)) * fog;
	col += vec3(0.49, 0.94, 0.57) * (it / 54.0) * 0.85;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.52)) * 100.0) - 0.5) * 0.08;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.052, 0.977, 0.913) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
