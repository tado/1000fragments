uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.54;
	float g = dot(sin(q * 2.82), cos(q.zxy * 2.82));
	return (abs(g) - 0.80) / (2.82 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.07);
	vec3 rd = normalize(vec3(p, 1.18));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = hue(tt * 0.13 + time * 0.02) * fog;
	col += vec3(0.56, 0.26, 0.69) * (it / 59.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
