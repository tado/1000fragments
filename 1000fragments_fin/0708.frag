uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.90) * (0.41 + 0.30 * h1) + fi * 2.39), cos((time * 0.90) * (0.46 + 0.75 * h2) + fi * 1.73)) * 0.68;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * -0.32;
	vec3 col = mix(vec3(0.043, 0.052, 0.089), vec3(0.048, 0.046, 0.131), clamp(0.5 + p.y * 0.54 + p.x * -0.29, 0.0, 1.0));
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.277, 1.320, 2.363) + fi * 0.95 + (time * 0.90) * 0.67)) * (0.0112 / (length(p - na) + 0.023));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.00){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.99, 0.57, 0.90) * (0.0022 / (sd + 0.015)) * (1.0 - ll / 1.00);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.988, 1.010, 0.948);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
