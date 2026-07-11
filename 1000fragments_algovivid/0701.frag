uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.30, 0.78, 0.63);
		q.xy = rot2(0.70 + (time * 0.65) * 0.22) * q.xy;
		q.xz = rot2(1.40) * q.xz;
		q *= 1.32; sc *= 1.32;
	}
	vec3 b = abs(q) - vec3(0.44);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.65) * 0.74), cos((time * 0.65) * 0.69)) * 0.09;
	vec3 ro = vec3(0.0, 0.0, -2.88);
	vec3 rd = normalize(vec3(p, 1.75));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.24 + (time * 0.65) * 0.29, vec3(0.36, 0.40, 0.37), vec3(0.23, 0.25, 0.27), vec3(0.88, 0.48, 0.59), vec3(0.51, 0.49, 0.72)) * fog;
	col += vec3(0.90, 0.41, 0.55) * (it / 67.0) * 0.32;
	col *= 0.83 + 0.10 * sin(gl_FragCoord.y * 1.46 + (time * 0.65) * 6.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 1.024, 0.925) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
