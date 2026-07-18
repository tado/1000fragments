uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.81) * (0.65 + 0.90 * h1) + fi * 2.39), cos((time * 0.81) * (0.43 + 0.86 * h2) + fi * 1.73)) * 0.91;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x += p.y * -0.33;
	p.y = abs(p.y);
	p *= 1.20;
	vec3 col = mix(vec3(0.018, 0.027, 0.049), vec3(0.015, 0.028, 0.055), clamp(0.5 + p.y * -0.16 + p.x * 0.08, 0.0, 1.0));
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(4.684, 6.644, 8.604) + fi * 0.45 + (time * 0.81) * 0.20)) * (0.0090 / (length(p - na) + 0.011));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.92){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(4.684, 6.644, 8.604) + ll * 3.00 + (time * 0.81) * 0.75)) * (0.0011 / (sd + 0.011)) * (1.0 - ll / 0.92);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.043, 1.007, 0.938);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
