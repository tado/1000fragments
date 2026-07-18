uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.90) * (0.35 + 0.95 * h1) + fi * 2.39), cos((time * 0.90) * (0.34 + 0.79 * h2) + fi * 1.73)) * 0.83;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p.y += sin(p.x * 2.43 + (time * 0.90) * 0.42) * 0.09;
	p *= 1.33;
	vec3 col = mix(vec3(0.031, 0.058, 0.084), vec3(0.018, 0.037, 0.097), clamp(0.5 + p.y * 0.01 + p.x * -0.21, 0.0, 1.0));
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.037, 2.416, 3.795) + fi * 0.94 + (time * 0.90) * 0.61)) * (0.0105 / (length(p - na) + 0.017));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.00){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(1.037, 2.416, 3.795) + ll * 3.43 + (time * 0.90) * 0.65)) * (0.0019 / (sd + 0.017)) * (1.0 - ll / 1.00);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.985, 1.003, 0.938);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
