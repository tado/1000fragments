uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.87) * (0.59 + 0.45 * h1) + fi * 2.39), cos((time * 0.87) * (0.37 + 0.90 * h2) + fi * 1.73)) * 0.80;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.87) * 0.43), cos((time * 0.87) * 0.50)) * 0.15;
	p *= 1.28;
	vec3 col = mix(vec3(0.074, 0.053, 0.040), vec3(0.070, 0.078, 0.031), clamp(0.5 + p.y * -0.63 + p.x * -0.19, 0.0, 1.0));
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(4.606, 5.461, 6.316) + fi * 0.40 + (time * 0.87) * 0.78)) * (0.0094 / (length(p - na) + 0.017));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.98){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.36, 0.96, 0.45) * (0.0017 / (sd + 0.012)) * (1.0 - ll / 0.98);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.031, 0.983, 0.941);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
