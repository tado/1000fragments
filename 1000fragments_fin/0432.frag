uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.75 + ga * 2.0 - t * 0.62 + ph);
    v = arm * exp(-gr * 1.37);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, (time * 0.64), 0.0);
	vec2 hq = rot2(0.71) * p * 22.13;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = mix(vec3(0.13, 0.10, 0.01), vec3(0.76, 0.79, 0.98), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.049, 1.003, 0.916);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
