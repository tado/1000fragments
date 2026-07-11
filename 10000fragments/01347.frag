uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.44 + t * 2.97 + ph) + sin(p.y * 12.21 - t * 2.97 + ph)
        + sin((p.x + p.y) * 2.53 + t * 2.97 + ph) + sin(length(p) * 3.91 - t * 2.97 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 1.01 + time * 0.74); }
	p = rot2(p.y * -3.26 + time * 0.52) * p;
	p = rot2(length(p) * -3.58 + time * 0.53) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.17, 1.43, 0.67) + vec3(0.06, 0.01, 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
