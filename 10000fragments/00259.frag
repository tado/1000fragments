uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.22 + t * 5.58 + ph) + sin(p.y * 6.67 - t * 5.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	{ float fr = length(p); p *= 1.0 + 0.57 * fr * fr; }
	p = rot2(p.y * -1.08 + time * 0.27) * p;
	p = fract(p * 2.46) - 0.5;
	p = rot2(length(p) * 2.50 + time * 0.58) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.45));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
