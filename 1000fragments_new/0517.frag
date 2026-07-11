uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.67;
	float g = dot(sin(q * 2.53), cos(q.zxy * 2.53));
	return (abs(g) - 0.53) / (2.53 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.03);
	vec3 rd = normalize(vec3(p, 1.69));
	rd.xy = rot2(time * 0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = hue(tt * 0.26 + time * 0.03) * fog;
	col += vec3(0.89, 0.33, 0.34) * (it / 48.0) * 0.30;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
