uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.52 + 0.21 * pow(abs(cos(ra * 4.0 + t * 0.51)), 1.40);
    v = sin((rr - pet) * 18.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.11));
	p = sin(p * 2.52 + time * 2.12) * 0.91;
	p = rot2(length(p) * -2.49 + time * 0.89) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.15));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
