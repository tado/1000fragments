uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 2.41;
	vec3 mq = mod(q, 2.33) - 1.16;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.01));
	rd.xy = rot2(time * -0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = hue(tt * 0.14 + time * 0.16) * fog;
	col += vec3(0.92, 0.40, 0.26) * (it / 67.0) * 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
