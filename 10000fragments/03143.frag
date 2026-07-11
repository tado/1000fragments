uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.76 + vec2(t * 0.69, -t * 0.69) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.06;
	p = rot2(1.41) * p;
	p *= 1.30;
	p = abs(p) - 0.42;
	p = fract(p * 2.81) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.94), field(p, time, 1.88));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
