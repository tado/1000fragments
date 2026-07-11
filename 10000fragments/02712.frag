uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.70 + 0.20 * cos(sa * 6 + t * 1.02 + ph);
    v = sin((sr - petal) * 16.42);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.44;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 1.81 * p.y + time * 1.07); p.y += 0.22 / wf * cos(wf * 3.86 * p.x + time * 1.91); }
	p += vec2(-0.76, -0.71) * sin(length(p) * 4.57 - time * 1.53) * 0.14;
	p *= 1.57;
	p = fract(p * 2.19) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.68));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
