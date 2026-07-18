uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.90) * (0.36 + 0.70 * h1) + fi * 2.39), cos((time * 0.90) * (0.39 + 0.66 * h2) + fi * 1.73)) * 0.77;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.90) * 0.98), cos((time * 0.90) * 0.38)) * 0.14;
	p *= 0.97;
	vec3 col = mix(vec3(0.010, 0.064, 0.079), vec3(0.030, 0.045, 0.111), clamp(0.5 + p.y * 0.32 + p.x * 0.08, 0.0, 1.0));
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(3.590, 5.049, 6.507) + fi * 1.08 + (time * 0.90) * 0.21)) * (0.0112 / (length(p - na) + 0.017));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.94){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.43, 0.41, 0.95) * (0.0024 / (sd + 0.009)) * (1.0 - ll / 0.94);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.006, 0.963, 1.019);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
