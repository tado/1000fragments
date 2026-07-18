uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.71) * (0.75 + 0.92 * h1) + fi * 2.39), cos((time * 0.71) * (0.40 + 0.93 * h2) + fi * 1.73)) * 0.84;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 0.87;
	p.x = abs(p.x) - 0.58;
	vec3 col = mix(vec3(0.036, 0.066, 0.047), vec3(0.038, 0.033, 0.078), clamp(0.5 + p.y * -0.41 + p.x * 0.22, 0.0, 1.0));
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(5.026, 7.041, 9.056) + fi * 1.37 + (time * 0.71) * 0.78)) * (0.0046 / (length(p - na) + 0.013));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.75){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.24, 0.35, 0.36) * (0.0018 / (sd + 0.019)) * (1.0 - ll / 0.75);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.930, 0.995, 1.054);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
