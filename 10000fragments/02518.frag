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
		q = abs(q) - vec3(0.64, 0.36, 0.44);
		q.xy = rot2(0.48 + time * 0.44) * q.xy;
		q.xz = rot2(0.37) * q.xz;
		q *= 1.34; sc *= 1.34;
	}
	vec3 b = abs(q) - vec3(0.33);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.63);
	vec3 rd = normalize(vec3(p, 1.73));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.12 + time * 0.18, vec3(0.41, 0.54, 0.47), vec3(0.30, 0.44, 0.40), vec3(0.73, 0.84, 0.96), vec3(0.54, 0.29, 0.61)) * fog;
	col += vec3(0.24, 0.97, 0.96) * (it / 67.0) * 0.81;
	col = mod(col * 2.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
