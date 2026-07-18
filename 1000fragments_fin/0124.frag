uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.76 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.20 + t * 1.01 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p.x += sin(p.y * 2.36 + (time * 0.82) * 1.41) * 0.29;
	float d = field(p, (time * 0.82), 0.0);
	vec3 col = vec3(0.738, 0.717, 0.955) * (0.10 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.030, 0.969, 1.008);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
