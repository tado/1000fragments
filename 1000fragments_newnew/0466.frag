uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.39, 0.52, 0.69);
		q.xy = rot2(0.91 + (time * 0.74) * 0.38) * q.xy;
		q.xz = rot2(1.33) * q.xz;
		q *= 1.54; sc *= 1.54;
	}
	vec3 b = abs(q) - vec3(0.54);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.51);
	vec3 rd = normalize(vec3(p, 1.02));
	rd.xy = rot2((time * 0.74) * 0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.26 + (time * 0.74) * 0.06, vec3(0.41, 0.44, 0.50), vec3(0.13, 0.12, 0.13), vec3(0.86, 0.62, 0.57), vec3(0.99, 0.37, 0.33)) * fog;
	col += vec3(0.75, 0.45, 0.34) * (it / 71.0) * 0.50;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.987, 1.007) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
