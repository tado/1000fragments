uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.90;
	vec2 g = mod(vec2(q.x, q.z), 2.00) - 1.00;
	float d = length(g) - (0.26 + 0.07 * sin(q.y * 3.04 + time * 2.67));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.00, 1.00, -3.0);
	vec3 rd = normalize(vec3(p, 1.66));
	rd.xy = rot2(time * -0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = hue(tt * 0.21 + time * 0.08) * fog;
	col += vec3(0.61, 0.80, 0.84) * (it / 57.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
