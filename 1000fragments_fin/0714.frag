uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.73) * (0.36 + 0.84 * h1) + fi * 2.39), cos((time * 0.73) * (0.72 + 0.50 * h2) + fi * 1.73)) * 0.56;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 0.79;
	p.x += p.y * 0.49;
	vec3 col = mix(vec3(0.066, 0.041, 0.077), vec3(0.054, 0.036, 0.061), clamp(0.5 + p.y * -0.32 + p.x * 0.02, 0.0, 1.0));
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(2.114, 3.797, 5.480) + fi * 0.87 + (time * 0.73) * 0.65)) * (0.0082 / (length(p - na) + 0.015));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.72){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(2.114, 3.797, 5.480) + ll * 3.85 + (time * 0.73) * 0.44)) * (0.0012 / (sd + 0.009)) * (1.0 - ll / 0.72);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.031, 0.983, 0.946);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
