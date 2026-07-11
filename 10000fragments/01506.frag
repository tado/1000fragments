uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.60 - t * 6.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.08 * p.y + time * 0.90); p.y += 0.30 / wf * cos(wf * 3.84 * p.x + time * 0.97); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(0.81) * p; }
	p = fract(p * 1.44) - 0.5;
	p = rot2(time * -0.75) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.08 + time * 0.27);
	col = fract(col * 1.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
