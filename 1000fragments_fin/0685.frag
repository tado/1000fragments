uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.92) * (0.63 + 0.71 * h1) + fi * 2.39), cos((time * 0.92) * (0.50 + 1.10 * h2) + fi * 1.73)) * 0.84;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p *= 0.99;
	vec3 col = mix(vec3(0.050, 0.042, 0.093), vec3(0.059, 0.046, 0.095), clamp(0.5 + p.y * -0.45 + p.x * -0.19, 0.0, 1.0));
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.601, 1.929, 3.258) + fi * 0.71 + (time * 0.92) * 0.53)) * (0.0090 / (length(p - na) + 0.018));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.76){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.58, 0.93, 0.28) * (0.0017 / (sd + 0.009)) * (1.0 - ll / 0.76);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.021, 0.979, 0.943);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
