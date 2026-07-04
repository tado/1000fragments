uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.75 + 0.86 * h1) + fi * 2.39), cos(time * (0.31 + 0.58 * h2) + fi * 1.73)) * 0.58;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec3 col = vec3(0.021, 0.035, 0.043);
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.70 + time * 0.51)) * (0.0042 / (length(p - na) + 0.017));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.80){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * 1.48 + time * 0.70)) * (0.0022 / (sd + 0.012)) * (1.0 - ll / 0.80);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 2.48 + time * 10.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
