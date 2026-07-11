uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.36;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.01) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.65) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.23 * fr * fr; }
	p = rot2(length(p) * 3.49 + time * 1.14) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.01));
	p.y += sin(p.x * 5.38 + time * 3.09) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.74, 0.20, 0.88) * (0.06 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
