uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.21 * cos(sa * 5.0 + t * 0.95 + ph);
    v = sin((sr - petal) * 12.79);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.90;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.12 * p.y + time * 1.62); p.y += 0.26 / wf * cos(wf * 3.25 * p.x + time * 2.04); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.79));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
