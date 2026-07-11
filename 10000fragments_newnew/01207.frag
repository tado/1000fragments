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
		q = abs(q) - vec3(0.63, 0.39, 0.66);
		q.xy = rot2(0.85 + time * 0.40) * q.xy;
		q.xz = rot2(1.37) * q.xz;
		q *= 1.45; sc *= 1.45;
	}
	vec3 b = abs(q) - vec3(0.54);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = hue(tt * 0.16 + time * 0.22) * fog;
	col += vec3(0.97, 0.32, 0.51) * (it / 68.0) * 0.31;
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 1.91 + time * 6.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
