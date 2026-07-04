uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.92;
    v = 0.5 * (sin(3.0 * cp.x + t * 0.95) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 0.55) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	{ p = vec2(atan(p.y, p.x) * 1.70, length(p) * 3.70 - time * 0.93); }
	p = rot2(p.y * 2.15 + time * 0.48) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.43, lr * 2.51 + time * 0.31); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.38, 1.10, 1.22) + vec3(0.22, 0.29, 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(2.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
