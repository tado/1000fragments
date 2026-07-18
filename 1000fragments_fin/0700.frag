uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.61) * (0.79 + 0.82 * h1) + fi * 2.39), cos((time * 0.61) * (0.64 + 0.87 * h2) + fi * 1.73)) * 0.56;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 1.52;
	p *= 1.38;
	vec3 col = mix(vec3(0.057, 0.033, 0.080), vec3(0.064, 0.028, 0.052), clamp(0.5 + p.y * 0.65 + p.x * -0.17, 0.0, 1.0));
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(4.061, 4.995, 5.928) + fi * 0.83 + (time * 0.61) * 0.67)) * (0.0060 / (length(p - na) + 0.010));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.98){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.62, 0.48, 0.73) * (0.0022 / (sd + 0.018)) * (1.0 - ll / 0.98);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.038, 0.989, 0.942);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
