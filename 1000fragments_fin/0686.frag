uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.74) * (0.78 + 1.13 * h1) + fi * 2.39), cos((time * 0.74) * (0.57 + 0.40 * h2) + fi * 1.73)) * 0.83;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	vec3 col = mix(vec3(0.036, 0.049, 0.088), vec3(0.045, 0.042, 0.111), clamp(0.5 + p.y * 0.12 + p.x * 0.08, 0.0, 1.0));
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.580, 2.710, 3.840) + fi * 0.80 + (time * 0.74) * 0.52)) * (0.0088 / (length(p - na) + 0.021));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.74){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.98, 0.93, 0.44) * (0.0024 / (sd + 0.016)) * (1.0 - ll / 0.74);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.013, 0.995, 0.991);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
