uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 6.82 * sin(t * 0.52) + t * 4.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.36; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.59; p = rot2(2.14) * p; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.93));
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.58 * p.y + time * 1.03); p.y += 0.21 / wf * cos(wf * 1.70 * p.x + time * 1.09); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.90 + time * 0.01);
	col = mod(col * 1.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
