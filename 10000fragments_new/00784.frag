uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.22 * cos(sa * 3.0 + t * 2.80 + ph);
    v = sin((sr - petal) * 6.21);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.64, 0.79) * sin(length(p) * 2.82 - time * 1.19) * 0.33;
	p = rot2(time * -1.43) * p;
	p = fract(p * 2.63) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.50 * p.y + time * 1.29); p.y += 0.27 / wf * cos(wf * 3.84 * p.x + time * 1.30); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.77 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
