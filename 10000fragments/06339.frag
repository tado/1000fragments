uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.70 - t * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	p = fract(p * 1.58) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.50 * p.y + time * 0.95); p.y += 0.25 / wf * cos(wf * 2.53 * p.x + time * 1.57); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(1.96) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.99 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
