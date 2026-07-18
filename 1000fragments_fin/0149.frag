uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.32;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.02)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.14 - t * 2.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.36;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.28, length(p) * 5.01 - (time * 0.62) * 0.76); }
	float d = field(p, (time * 0.62), 0.0);
	vec3 col = vec3(0.760, 0.738, 0.970) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.91));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.021, 0.955, 1.016);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
