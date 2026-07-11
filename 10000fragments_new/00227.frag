uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.40 + 0.21 * pow(abs(cos(ra * 7.0 + t * 1.40)), 2.00);
    v = sin((rr - pet) * 9.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.26 * p.y + time * 1.33); p.y += 0.41 / wf * cos(wf * 3.20 * p.x + time * 0.95); }
	p = (floor(p * 17.5) + 0.5) / 17.5;
	p = rot2(length(p) * -2.85 + time * 0.53) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.64));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
