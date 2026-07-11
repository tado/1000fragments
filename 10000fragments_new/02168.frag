uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.61;
	float g = dot(sin(q * 3.95), cos(q.zxy * 3.95));
	return (abs(g) - 0.61) / (3.95 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.31);
	vec3 rd = normalize(vec3(p, 1.58));
	rd.xy = rot2(time * 0.36) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = hue(tt * 0.12 + time * 0.03) * fog;
	col += vec3(0.96, 0.95, 0.99) * (it / 72.0) * 0.79;
	col = fract(col * 1.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
