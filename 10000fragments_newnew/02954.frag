uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.59 + 0.55 * h1) + fi * 2.39), cos(time * (0.68 + 0.69 * h2) + fi * 1.73)) * 0.60;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.013, 0.028);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.94 + time * 0.89)) * (0.0095 / (length(p - na) + 0.013));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.78){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * 1.68 + time * 0.64)) * (0.0026 / (sd + 0.011)) * (1.0 - ll / 0.78);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.80 + 0.12 * sin(gl_FragCoord.y * 2.71 + time * 15.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
