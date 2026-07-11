uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.10 + t * 1.22 + ph) + sin(p.y * 3.28 - t * 1.22 + ph)
        + sin((p.x + p.y) * 4.77 + t * 1.22 + ph) + sin(length(p) * 12.85 - t * 1.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.54) * 0.65), cos((time * 0.54) * 0.84)) * 0.17;
	p.y += sin(p.x * 2.36 + (time * 0.54) * 0.92) * 0.18;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.10, lr * 2.14 + (time * 0.54) * -0.50); }
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.54) * 0.77));
	float d = field(p, (time * 0.54), 0.0);
	vec3 col = vec3(0.57, 0.56, 0.50) * (0.06 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= 0.90 + 0.13 * sin(gl_FragCoord.y * 2.63 + (time * 0.54) * 9.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(1.037, 0.984, 0.922) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
