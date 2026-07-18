uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.83) * (0.37 + 1.14 * h1) + fi * 2.39), cos((time * 0.83) * (0.44 + 0.72 * h2) + fi * 1.73)) * 0.72;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 2.24 + (time * 0.83) * 1.01) * 0.19;
	p = p.yx;
	vec3 col = mix(vec3(0.052, 0.033, 0.060), vec3(0.035, 0.030, 0.079), clamp(0.5 + p.y * -0.37 + p.x * 0.05, 0.0, 1.0));
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(4.405, 5.634, 6.864) + fi * 1.39 + (time * 0.83) * 0.38)) * (0.0112 / (length(p - na) + 0.015));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.92){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(4.405, 5.634, 6.864) + ll * 2.96 + (time * 0.83) * 0.25)) * (0.0029 / (sd + 0.010)) * (1.0 - ll / 0.92);
			}
		}
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.948, 0.982, 1.057);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
