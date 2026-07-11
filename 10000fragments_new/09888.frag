uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.67 + 0.45 * sin(t * 0.76)) + vec2(-0.48, 0.01) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 26; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 26.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.29, lr * 1.23 + time * -0.61); }
	p += vec2(-0.43, 0.11) * sin(length(p) * 3.52 - time * 2.26) * 0.13;
	p.y += sin(p.x * 3.39 + time * 2.19) * 0.23;
	p = rot2(length(p) * -2.37 + time * 1.11) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.12, vec3(0.48, 0.45, 0.48), vec3(0.49, 0.43, 0.34), vec3(0.80, 0.76, 0.72), vec3(0.69, 0.40, 0.99));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
