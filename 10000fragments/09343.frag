uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.40 + vec2(t * 1.51, -t * 1.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	p = abs(p);
	p *= 2.68;
	p = rot2(2.05) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.02));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
