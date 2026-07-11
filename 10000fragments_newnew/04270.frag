uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.54, 0.52, 0.64);
		q.xy = rot2(0.83 + time * 0.15) * q.xy;
		q.xz = rot2(0.45) * q.xz;
		q *= 1.31; sc *= 1.31;
	}
	vec3 b = abs(q) - vec3(0.56);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.49);
	vec3 rd = normalize(vec3(p, 1.03));
	rd.xy = rot2(time * -0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = hue(tt * 0.26 + time * 0.02) * fog;
	col += vec3(0.64, 0.36, 0.33) * (it / 57.0) * 0.52;
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
