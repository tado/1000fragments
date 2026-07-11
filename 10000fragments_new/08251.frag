uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.23 + t * 4.18 + ph) + sin(p.y * 7.67 - t * 4.18 + ph)
        + sin((p.x + p.y) * 9.16 + t * 4.18 + ph) + sin(length(p) * 6.43 - t * 4.18 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	p = (floor(p * 21.4) + 0.5) / 21.4;
	p = rot2(time * -0.62) * p;
	p.y += sin(p.x * 3.68 + time * 2.58) * 0.28;
	p += vec2(0.14, -0.17) * sin(length(p) * 5.84 - time * 2.34) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.78, 0.50, 0.55) * (0.18 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
