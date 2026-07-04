uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.05;
	float g = dot(sin(q * 2.49), cos(q.zxy * 2.49));
	return (abs(g) - 0.80) / (2.49 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.13);
	vec3 rd = normalize(vec3(p, 1.15));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = hue(tt * 0.13 + time * 0.16) * fog;
	col += vec3(0.73, 0.49, 0.31) * (it / 72.0) * 0.45;
	col = fract(col * 1.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
