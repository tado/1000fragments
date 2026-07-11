uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.21;
	float g = dot(sin(q * 3.00), cos(q.zxy * 3.00));
	return (abs(g) - 0.46) / (3.00 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.06);
	vec3 rd = normalize(vec3(p, 1.35));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = hue(tt * 0.28 + time * 0.20) * fog;
	col += vec3(0.44, 0.90, 0.85) * (it / 66.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
