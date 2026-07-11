uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.69 + sr * 23.52 - t * 2.35 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.62 * p.y + time * 1.21); p.y += 0.28 / wf * cos(wf * 3.09 * p.x + time * 0.95); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.61 + time * 0.00);
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
