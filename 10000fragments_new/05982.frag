uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.10;
	float g = dot(sin(q * 3.54), cos(q.zxy * 3.54));
	return (abs(g) - 0.57) / (3.54 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.53);
	vec3 rd = normalize(vec3(p, 1.71));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = hue(tt * 0.30 + time * 0.11) * fog;
	col += vec3(0.92, 0.49, 0.84) * (it / 48.0) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
